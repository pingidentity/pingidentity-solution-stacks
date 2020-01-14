# Customer solution profile

This is a solution profile for a customer authentication authority use case, and is set up as follows:

  * The stack includes PingFederate, PingID SDK, PingAccess, PingDirectory, PingDataGovernance, PingDataSync, and PingDataConsole (as the admin console for PingDirectory and PingDataGovernance).
  *

> If you currently have one of our other Docker stacks running (such as, the Workforce stack), you'll need to bring down the stack before proceeding.

## Architecture

The Customer stack looks like this:

![Customer solution diagram](customerStack.png)

## Prerequisites

  * You've completed the inital DevOps setup in [Get started](getStarted.md).

## What you'll do

  1. Create a `${HOME}/projects/devops/customer` directory and copy there the `docker-compose.yaml` and `env_vars` files in `${HOME}/projects/devops/pingidentity-solution-stacks/Solution-BaselineCustomer`.
  2. Deploy the Customer stack.
  3. Log in to the administrative consoles.
  4. Log in to the products as a user.
  5. Test the deployment using the user runtime ports.
  6. (Optional) Test the deployment using the PingDataGovernance or PingDirectory Consent APIs.

  See **Deploy the Customer stack** for more information.


## Deploy the Customer stack

  1. Create a new directory in `${HOME}/projects/devops` called "customer".
  2. Copy the `docker-compose.yaml` and `env_vars` files in `${HOME}/projects/devops/pingidentity-solution-stacks/Solution-BaselineCustomer` to the `${HOME}/projects/devops/customer` directory you created. For example:

  ```text
  cd ${HOME}/projects/devops/pingidentity-solution-stacks/Solution-WorkForce
  cp docker-compose.yaml env_vars ${HOME}/projects/devops/workforce
  ```

  3. If you've pulled or downloaded our images from the Ping Identity site on Docker hub, or have been running one of our other Docker stacks, from the `${HOME}/projects/devops/customer` directory, enter:

    ```text
    docker-compose pull
    ```

   This will ensure that you have the right container versions for the Customer solution profile.

  4. From the `${HOME}/projects/devops/workforce` directory, run Docker Compose to deploy the solution stack:

    ```text
    docker-compose up -d
    ```

    > Docker Compose uses the `docker-compose.yaml` file in the directory from which it's run.

    Enter `docker ps` at intervals to display the status of the containers.

  5. When the PingFederate, PingAccess, PingDirectory, PingDataGovernance, PingDataSync, and PingDataConsole containers all show a status of "Up" and "(healthy)", continue to the next step to log in to the consoles.

  6. You can now log in to the administrative consoles:

   - PingDirectory
      Server: https://localhost:636
      User: cn=dmanager
      Password: 2AccessM0re!

   - PingDataConsole for PingDirectory
      Console URL: https://localhost:8443/console
      Server: pingdirectory
      User: administrator
      Password: 2DirectoryM0re!

   - PingFederate
      Console URL: https://localhost:9999/pingfederate/app
      User: administrator
      Password: 2FederateM0re!

   - PingAccess
      Console URL: https://localhost:9000
      User: administrator
      Password: 2AccessM0re!

   - PingDataGovernance
      Server: https://localhost:636
      User: cn=dmanager
      Password: 2AccessM0re!

   - PingDataConsole for PingDataGovernance
      Console URL: https://localhost:8443/console
      Server: pingdatagovernance
      User: administrator
      Password: 2DirectoryM0re!

   - PingDataSync
      Server: https://localhost:636
      User: cn=dmanager
      Password: 2AccessM0re!
    > PingDataSync has an external server connection to PingDirectory, but there are *no* Sync Pipes preconfigured.

   - Apache Directory Studio for PingDirectory
      LDAP Port: 1640
      LDAP BaseDN: dc=example,dc=com
      Root Username: cn=dmanager
      Root Password: 2DirectoryM0re!

## Test the depoyment

To access the user runtime ports, use these URLs. You can also find them using the related administrative console:

   * SAML
      URL: https://pingfederate:9031/idp/startSSO.ping?PartnerSpId=https%3A%2F%2Fhttp-bin.org%2Fanything
      User: user.0 (up to user.10)
      Password: password

   * OIDC
      URL: https://pingfederate:9031/sp/startSSO.ping?PartnerIdpId=https%3A%2F%2Fpingfederate%3A9031
      User: user.0 (up to user.10)
      Password: password

   * OAuthPlayground
      URL: https://pingfederate:9031/OAuthPlayground
      AuthzCode, Implicit
        User: user.0 (up to user.10)
        Password: password
      ROPC
        User: joe
        Password: 2Federate
      Client Creds
       User: client_credentials
       Password: 2Federate

   * PingAccess App
      URL: https://pingaccess/anything
      User: user.0 (up to user.10)
      Password: password

To access the APIs:

   * PingDataGovernance API
      URL: https://pingdatagovernance:2443/anything
      Obtain a token from PingFederate using OAuthPlayground or make Postman calls.

   * PingDirectory Consent API
      You can use either Basic or Bearer authentication. If you are using Bearer Authentication, use `urn:pingdirectory:consent` for unprivileged Consent calls and `urn:pingdirectory:consent_admin` for privileged Consent calls. A sample email_newsletter Consent Definition has been built for you.

      To see the consents, use: GET https://pingdirectory:1640/consent/v1/consents?definition=email_newsletter&subject=user.0

      To post consents, use: POST https://pingdirectory:1640/consent/v1/consents

      See the [PingDirectory Consent API documentation](https://apidocs.pingidentity.com/pingdirectory/consent/v1/api/guide/index.html) for more information.

When you no longer want to run this stack, you can either bring the stack down (recommended), or stop the running stack. Entering:

  `docker-compose down`

will remove all of the containers and associated Docker networks. Entering:

  `docker-compose stop`

will stop the running stack without removing any of the containers or associated Docker networks.
