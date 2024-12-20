interface AuthoringEnv {
    TaskListTestHarnessURL: string;
    AuthoringUrl: string;
    WorkflowTestHarnessURL: string;
}

interface EnvSettings {
    systest: AuthoringEnv,
    staging: AuthoringEnv,
    performance: AuthoringEnv,
    integration: AuthoringEnv,
}


export const env: EnvSettings = {
    systest: {
        TaskListTestHarnessURL: "https://authoring.systest.cha.rbxd.ds/mfe/testHarness/tasklist",
        AuthoringUrl: "https://authoring.systest.cha.rbxd.ds/review-requests",
        WorkflowTestHarnessURL: "https://authoring.systest.cha.rbxd.ds/workflow-test-harness/"
    },
    staging: {
        TaskListTestHarnessURL: "https://authoring.staging.cha.rbxd.ds/mfe/testHarness/tasklist",
        AuthoringUrl: "https://authoring.staging.cha.rbxd.ds/review-requests",
        WorkflowTestHarnessURL: "https://authoring.staging.cha.rbxd.ds/workflow-test-harness/"
    },
    performance: {
        TaskListTestHarnessURL: "https://authoring.performance.cha.rbxd.ds/mfe/testHarness/tasklist",
        AuthoringUrl: "https://authoring.performance.cha.rbxd.ds/review-requests",
        WorkflowTestHarnessURL: "https://authoring.performance.cha.rbxd.ds/workflow-test-harness/"
    },
    integration: {
        TaskListTestHarnessURL: "https://authoring.integration.cha.rbxd.ds/mfe/testHarness/tasklist",
        AuthoringUrl: "https://authoring.integration.cha.rbxd.ds/review-requests",
        WorkflowTestHarnessURL: "https://authoring.integration.cha.rbxd.ds/workflow-test-harness/"
    },
};

export const getEnv = (): AuthoringEnv => {
    // @ts-ignore
    const envName = process.env.ENV_NAME ?? 'staging';
    return env[`${envName}`]
}

export const getBrowser = () => {
    const browserName = process.env.BROWSER ?? 'chromium';
    return browserName;
};