#!/bin/bash

# Install dependencies and execute tests
yarn install && \
yarn add -D @playwright/test && \
yarn add -D cross-env && \
yarn add -D playwright@latest && \
yarn playwright test -g visual_tests.spec.ts --list && yarn cross-env ENV_NAME=staging playwright test -g visual_tests.spec.ts --browser=chromium