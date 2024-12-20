export const getallmetrics = async (page) => {
  let fcpValues: any[] = [], lcpValues: any[] = [], totalBlockingTime: any[] = [], navValues: any[] = [];
  let count = 0;
  try {
    do {
      fcpValues[count] = await calculateFCPFromTrace(page);
      lcpValues[count] = await calculateLCPFromTrace(page);
      totalBlockingTime[count] = await calculateTBT(page);
      navValues[count] = await calculatenavigation(page);
      /*  console.log(`FCP values for iteration ${count} is:`+ fcpValues[count]);
        console.log(`LCP values for iteration ${count} is :`+ lcpValues[count]);
        console.log(`Total Blocking time values for iteration ${count} is :`+ totalBlockingTime[count]);
        console.log(`Navigation values for iteration ${count} is :`+ navValues[count]);*/
      count++;
      await page.reload();
    } while (count < 1);
  } catch (error) {
    console.log('Error in metrics Calculation for Pricing Pilets');
  }
  var fcpResult = await getAverage(fcpValues);
  var lcpResult = await getAverage(lcpValues);
  var TBTResult = await getAverage(totalBlockingTime);
  var navigationResult = await getAverage(navValues);
  return { fcpResult, lcpResult, TBTResult, navigationResult };

}

export const calculateLCPFromTrace = async (page) => {
  return new Promise((resolver) => {
    setTimeout(async () => {
      const lcpValue = await page.evaluate(async () => {
        return new Promise((resolve) => {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            resolve(entries[entries.length - 1].startTime);
          });
          observer.observe({ type: 'largest-contentful-paint', buffered: true });
        });
      });
      resolver(parseFloat(lcpValue.toFixed(2)));
    });
  });

};

export const calculateFCPFromTrace = async (page) => {
  return new Promise((resolver) => {
    setTimeout(async () => {
      const fcpValue = await page.evaluate(async () => {
        return new Promise((resolve) => {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntriesByName('first-contentful-paint');
            resolve(entries[0].startTime);
          });

          observer.observe({ type: 'paint', buffered: true });
        });
      });
      resolver(parseFloat(fcpValue.toFixed(2)));
    });
  });
};

export const calculateTBT = async (page) => {
  return new Promise((resolver) => {
    setTimeout(async () => {
      const totalBlockingTime = await page.evaluate(async () => {
        return new Promise((resolve) => {
          let totalBlockingTime = 0
          new PerformanceObserver(function (list) {
            const perfEntries = list.getEntries()
            for (const perfEntry of perfEntries) {
              totalBlockingTime += perfEntry.duration - 50
            }
            resolve(totalBlockingTime)
          }).observe({ type: 'longtask', buffered: true })
        });
      });
      resolver(parseFloat(totalBlockingTime.toFixed(2)));
    });
  });
};

export const calculatenavigation = async (page) => {
  return new Promise((resolver) => {
    setTimeout(async () => {
      const navValues = await page.evaluate(() =>
        JSON.stringify(performance.getEntriesByType('navigation'))
      )
      const navigationTiming = JSON.parse(navValues)
      // Get the start to end load event time
      const startToLoadEventEnd = navigationTiming[0].loadEventEnd - navigationTiming[0].startTime;

      //console.log('startToLoadEventEnd is ' + startToLoadEventEnd)
      resolver(parseFloat(startToLoadEventEnd.toFixed(2)));
    });
  });
}

export const getAverage = async (metrics) => {
  return metrics.reduce((a, b) => a + b, 0) / metrics.length;
};

