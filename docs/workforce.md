# Workforce solution

## Prerequisites

  * You've completed the [inital DevOps setup](getStarted.md).
  * You have a registered and activated a PingOne for Enterprise account. You can register for a [30 day free trial account here](https://www.pingidentity.com/en/trials/p14e-trial.html).

## What you'll do

  1. Deploy the Workforce solution stack.
  2. Log in to the PingFederate console and select to connect to PingOne for Enterprise.
  3. Log in to PingOne for Enterprise, select to use PingFederate as the identity repository, and copy the activation key.
  4. In PingFederate, paste the activation key, then configure PingFederate to use PingDirectory as the directory server.
  5. Save the PingFederate and PingOne for Enterprise configurations.
  6. Test the deployment.

## Deploy the Workforce solution stack

  1. Create a new directory in `${HOME}/projects/devops` called "workforce".
  2. Copy the docker-compose.yaml and env_vars files in `${HOME}/projects/devops/pingidentity-solution-stacks/Solution-WorkForce` to the `${HOME}/projects/devops/workforce` directory. For example:

  ```text
  cd ${HOME}/projects/devops/pingidentity-solution-stacks/Solution-WorkForce
  cp docker-compose.yaml env_vars ${HOME}/projects/devops/workforce
  ```

  3. From the `${HOME}/projects/devops/workforce` directory, run Docker Compose to deploy the solution stack:

  ```text
  docker-compose up -d
  ```

  > Docker Compose uses the `docker-compose.yaml` file in the directory from which it's run.

    Enter `docker ps` at intervals to display the status of the containers.

  4. When the PingFederate, PingDirectory, and PingDataConsole containers all show a status of "Up" and "(healthy)", continue to the next section to log in to the PingFederate console.

### Set up PingFederate

You'll use PingFederate and PingOne for Enterprise to set up PingFederate as the identity repository for PingOne. You'll also be using PingFederate to configure PingDirectory as the directory server.

  1. Open a browser and go to:

    ```text
    https://localhost:9999/pingfederate/app
    ```

  2. Use these credentials to log in:

    ```text
    Administrator: `Administrator`
    Password: `2FederateM0re`
    ```

  3. The initial page asks whether or not you want to connect to PingOne for Enterprise. Select `Yes, Connect to PingOne for Enterprise`.
  4. Sign on to your PingOne for Enterprise account and go to `Setup` &#8594; `Identity Repository` &#8594; `Connect to an Identity Repository` and select `PingFederate`.
  5. In PingOne for Enterprise, select `Yes` that you currently have a PingFederate installation.
  6. In PingOne for Enterprise, click `Next` and copy the activation key for PingFederate.
  7. In PingFederate, copy into the `Activation Key` field the single-use activation key, and click `Next`.
  8. You're asked whether to connect to a Directory server. Select `Yes, Connect a Directory Server`.
  9. The LDAP configuration form for the directory server is displayed. Use the following entries:

    ```text
    Directory Type: PingDirectory
    Data Store Name: pingdirectory
    Hostname: pingdirectory
    Service Account DN: cn=administrator
    Password: 2FederateM0re
    Search Base: dc=workforce.com
    ```

    > The Search Filter field is automatically filled in.

  10. Click `Next` to continue with an unsecure connection.
  11. Select to SSO with PingOne.
  12. Confirm `https://localhost:9031` as the base URL for PingFederate.

     The configuration settings you've applied are displayed.

  13. Click `Next` to apply the settings.
  14. Go to your PingOne for Enterprise session. When `Configured` is displayed, click `Next`.
  15. Accept the default attribute mapping and click `Save`.

## Test the deployment
