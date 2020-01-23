# Customer Solution Profile

This is a solution profile for a customer authentication authority use case, and is preconfigured as follows:

  * The stack includes PingFederate, PingAccess, PingDirectory, PingDataGovernance, PingDataSync, and the Ping data console (as the admin console for PingDirectory, PingDataGovernance, and PingDataSync). It also includes the latest adapters for PingID SDK.
  * PingFederate connects to PingDirectory over LDAP.
  * PingDirectory is configured for ten (10) sample user accounts and customized schema examples, as well as configuration of the Consent API available in PingDirectory.
  * PingFederate is configured as an OpenID Connect (OIDC) provider.
  * PingFederate connects to PingAccess using OIDC.
  * PingFederate includes the PingID SDK Integration Kit v1.7 in its `deploy` directory.
  * PingDataGovernance uses PingFederate to validate its access token, used to access the supplied dummy application for PingDataGovernance.
  * PingFederate connects to OAuth Playground using OAuth and OIDC.
  * PingFederate connects to a supplied dummy SAML application.
  * PingFederate connects to another supplied dummy application using the Agentless Integration Kit (AIK).
  * PingAccess is integrated with a dummy Web application using the HTTP headers.
  * PingDataSync has been configured to use PingDirectory as an External Server.

> If you currently have one of our other Docker stacks running (such as, the Workforce stack), you'll need to bring down the stack before proceeding.

## Architecture

The Customer stack looks like this:

![Customer solution diagram](customerStack.png)

## Prerequisites

  * You've completed the inital DevOps setup in [Get started](getStarted.md).
  * Docker running on either:
    - A virtual host (such as a Scalr instance) having a minimum of 2 virtuals CPUs, 8 Gb of memory, and 40 Gb of volume space.
    - A local machine with a minimum configuration of Intel I7 CPU or equivalent, 16 Gb of memory, and 40 Gb of disk space. You'll need to change the default Docker preference settings for resources (Docker Desktop --> Advanced tab) to: a minimum of 5 CPUs, 5 Gb of memory, 2 Gb of swap space.

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
  cd ${HOME}/projects/devops/pingidentity-solution-stacks/Solution-BaselineCustomer
  cp docker-compose.yaml env_vars ${HOME}/projects/devops/customer
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

  5. When the PingFederate, PingAccess, PingDirectory, PingDataGovernance, PingDataSync, and the Ping data console containers all show a status of "Up" and "(healthy)", continue to the next step.
  6. Change your `hosts` file to add the IP address of your Docker engine host, and assign the entries:

     <dockerIP>  `pingfederate pingaccess pingdirectory pingdataconsole pingdirectory pingdatagovernance`

  6. You can now log in to the administrative consoles:

   * PingDirectory
      - Server: pingdirectory:636
      - User: cn=dmanager
      - Password: 2DirectoryM0re!

   * Ping data console for PingDirectory
      - Console URL: https://pingdataconsole:8080/console/login
      - Server: pingdirectory:636
      - User: administrator
      - Password: 2DirectoryM0re!

   * PingFederate
      - Console URL: https://pingfederate:9999/pingfederate/app
      - User: administrator
      - Password: 2FederateM0re!

   * PingAccess
      - Console URL: https://pingaccess:9000
      - User: administrator
      - Password: 2AccessM0re!

   * PingDataGovernance
      - Server: pingdatagovernance:636
      - User: cn=dmanager
      - Password: 2DirectoryM0re!

   * Ping data console for PingDataGovernance
      - Console URL: https://pingdataconsole:8080/console/login
      - Server: pingdatagovernance:636
      - User: administrator
      - Password: 2DirectoryM0re!

   * PingDataSync
      - Server: pingdatasync:636
      - User: cn=dmanager
      - Password: 2DatasyncM0re!

   * Ping data console for PingDataSync
      - Console URL: https://pingdataconsole:8080/console/login
      - Server: pingdatasync:636
      - User: cn=dmanager
      - Password: 2DatasyncM0re!

    > PingDataSync has an external server connection to PingDirectory, but there are *no* Sync Pipes preconfigured.

   * Apache Directory Studio for PingDirectory
      - LDAP Port: <port#>
      - LDAP BaseDN: dc=example,dc=com
      - Root Username: cn=dmanager
      - Root Password: 2DirectoryM0re!

      Where <port#> is the port assigned to PingDirectory. To find this, enter `docker ps`. The entry for PingDirectory will be similar to:

        ```txt
        942d425cbc3e        pingidentity/pingdirectory        "tini -- entrypoint.…"   7 minutes ago       Up 7 minutes (healthy)     389/tcp, 689/tcp, 5005/tcp, 0.0.0.0:1452->443/tcp, 0.0.0.0:1645->636/tcp   customer_pingdirectory_1
        ```

      The LDAP port assignment is at the end. In this case, it's `1645`.

## Test the depoyment

To access the user runtime ports, use these URLs. You can also find them using the related administrative console:

   * SAML
      - URL: https://pingfederate:9031/idp/startSSO.ping?PartnerSpId=https%3A%2F%2Fhttp-bin.org%2Fanything
      - User: user.0 (up to user.10)
      - Password: password

   * OIDC
      - URL: https://pingfederate:9031/sp/startSSO.ping?PartnerIdpId=https%3A%2F%2Fpingfederate%3A9031
      - User: user.0 (up to user.10)
      - Password: password

   * OAuthPlayground
      - URL: https://pingfederate:9031/OAuthPlayground
      - AuthzCode, Implicit
          - User: user.0 (up to user.10)
          - Password: password
      - ROPC
          - User: joe
          - Password: 2Federate
      - Client Creds
          - User: client_credentials
          - Password: 2Federate

   * PingAccess App
      - URL: https://pingaccess/anything
      - User: user.0 (up to user.10)
      - Password: password

To access the APIs:

   * PingDataGovernance API
      - URL: https://pingdatagovernance:2443/anything
      - Obtain a token from PingFederate using OAuthPlayground or make Postman calls.

   * PingDirectory Consent API

     You can use either Basic or Bearer authentication. If you are using Bearer Authentication, use `urn:pingdirectory:consent` for unprivileged Consent calls and `urn:pingdirectory:consent_admin` for privileged Consent calls. A sample email_newsletter Consent Definition has been built for you.

     To see the consents, use: `GET https://pingdirectory:<port#>/consent/v1/consents?definition=email_newsletter&subject=user.0`.

     To post consents, use: `POST https://pingdirectory:<port#>/consent/v1/consents`.

     Where <port#> is the port assigned to PingDirectory. To find this, enter `docker ps`. The entry for PingDirectory will be similar to:

       ```txt
       942d425cbc3e        pingidentity/pingdirectory        "tini -- entrypoint.…"   7 minutes ago       Up 7 minutes (healthy)     389/tcp, 689/tcp, 5005/tcp, 0.0.0.0:1452->443/tcp, 0.0.0.0:1645->636/tcp   customer_pingdirectory_1
       ```

     The LDAP port assignment is at the end. In this case, it's `1645`.

     See the [PingDirectory Consent API documentation](https://apidocs.pingidentity.com/pingdirectory/consent/v1/api/guide/index.html) for more information.

When you no longer want to run this stack, you can either bring the stack down (recommended), or stop the running stack. Entering:

  `docker-compose down`

will remove all of the containers and associated Docker networks. Entering:

  `docker-compose stop`

will stop the running stack without removing any of the containers or associated Docker networks.
