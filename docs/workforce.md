# Workforce Solution Profile

This is a solution profile for a workforce authentication authority use case, and is preconfigured as follows:

  * The stack includes PingFederate, PingDirectory, and the Ping data console (as the admin console for PingDirectory).
  * A network-accessible Microsoft Active Directory (AD) installation provides the user store.
  * PingFederate uses PingDirectory to store administrator account, OAuth clients and grants, and session information.
  * PingID provides multi-factor authentication and policies.
  * Two dummy OpenID Connect (OIDC) applications are preconfigured in PingFederate for testing SSO.

You'll use your (prerequisite) PingOne for Enterprise account for SSO.

> If you currently have one of our other Docker stacks running (such as, the Customer stack), you'll need to bring down the stack before proceeding.

## Architecture

The Workforce stack looks like this:

![Workforce solution diagram](workforceStack.png)

### The preconfigured AD implementation

The preconfigured AD implementation available to you uses these settings:

| Name | Value |
| --- | --- |
| Forest name | `workforce.com` |
| Root DN | `dc=workforce,dc=com` |
| NetBIOS name | `workforce` |
| Domain Controller DNS | `int-ad.solution-wf.ping-eng.com`

The LDAPS certificate used by AD (`solution-wf-ad-cert.crt`) has been exported and is located in the [ActiveDirectory directory](../Solution-WorkForce/ActiveDirectory).

## Prerequisites

  * You've completed the inital DevOps setup in [Get started](getStarted.md).
  * You've registered and activated a PingOne for Enterprise account. You can register for a [30 day free trial account here](https://www.pingidentity.com/en/trials/p14e-trial.html).

## What you'll do

  1. Deploy the Workforce stack.
  2. Set up PingFederate as the PingOne for Enterprise identity repository, and configure PingDirectory as the PingFederate directory server.
  3. When configuring PingFederate to use PingOne for Enterprise for SSO, you've the option to configure SSO using Kerberos.
  4. Save the PingFederate and PingOne for Enterprise configurations.
  5. To use PingID for multi-factor authentication, Base64 encode your PingID client secret and copy it into the `env_vars` file in the [Solution-WorkForce](../Solution-WorkForce) directory.
  6. Test the deployment.

  See **Deploy the Workforce stack** and **Set up PingFederate** for more information.

## Deploy the Workforce stack

  1. Create a new directory in `${HOME}/projects/devops` called "workforce".
  2. Copy the docker-compose.yaml and env_vars files in `${HOME}/projects/devops/pingidentity-solution-stacks/Solution-WorkForce` to the `${HOME}/projects/devops/workforce` directory. For example:

  ```text
  cd ${HOME}/projects/devops/pingidentity-solution-stacks/Solution-WorkForce
  cp docker-compose.yaml env_vars ${HOME}/projects/devops/workforce
  ```

  3. If you've pulled or downloaded our images from the Ping Identity site on Docker hub, or have been running one of our other Docker stacks, from the `${HOME}/projects/devops/workforce` directory, enter:

     ```text
     docker-compose pull
     ```

     This will ensure that you have the right container versions for the Customer solution profile.

  4. To use PingID for multi-factor authentication:

     a. Base64 encode your PingID client secret. You'll find the PingID client secret in PingOne for Enterprise (Setup --> PingID --> Client Integration).

     b. Copy the encoded client secret into the `PID_BASE64` assignment in the `env_vars` file located in the [Solution-WorkForce directory](../Solution-WorkForce).

  5. From the `${HOME}/projects/devops/workforce` directory, run Docker Compose to deploy the solution stack:

  ```text
  docker-compose up -d
  ```

  > Docker Compose uses the `docker-compose.yaml` file in the directory from which it's run.

    Enter `docker ps` at intervals to display the status of the containers.

  6. When the PingFederate, PingDirectory, and the Ping data console containers all show a status of "Up" and "(healthy)", continue to the next section to log in to the PingFederate console.

## Set up PingFederate

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

     > If you bring down the Workforce stack without having set up a local Docker volume to store configuration changes as recommended in [Get started](getStarted.md), your prior configuration of PingFederate will not be saved and you'll need to repeat your PingFederate set up. In this case, however, PingOne for Enterprise will retain its PingFederate configuration, so you'll be able to use the existing activation key in PingOne for Enterprise. In PingOne for Enterprise just select to edit the configuration and again copy the activation key displayed.

  7. In PingFederate, copy into the `Activation Key` field the single-use activation key, and click `Next`.
  8. You're asked whether to connect to a Directory server. Select `No, Do Not Connect a Directory Server`.
  9. Click `Next` to continue with an unsecure connection.
  10. Select to SSO with PingOne.
  11. Confirm `https://localhost:9031` as the base URL for PingFederate.

     The configuration settings you've applied are displayed.

  12. Click `Next` to apply the settings.
  13. Go to your PingOne for Enterprise session. When `Configured` is displayed, click `Next`.
  14. Accept the default attribute mapping and click `Save`.

## Set up a Windows Kerberos client

The Workforce stack is preconfigured to use a network-accessible installation of AD as the user store.

  > If you'd like to reconfigure this to use your own AD forest, you'll need to change the `Datastore` and `Password Credential Validator` settings in PingFederate to reflect your installation.

To use Kerberos with Windows clients:

  1. Assign your Windows client DNS to the IP address of the AD Domain Controller (DC). [?? what is this for the preconfigured AD?]
  2. Join the Windows client to the domain.
  3. Log on to the Windows client as a domain user. For the preconfigured AD domain, this can be either:

     * User1
      - User: pinguser1
      - Password: 2FederateM0re
     * User2
      - User: pinguser2
      - Password: 2FederateM0re

  4. Add the PingFederate host to the Internet Explorer (IE) Intranet Zone.

     If you want to use Edge, import the IE settings to Edge (Settings --> Import --> IE).

  5. Set the PingFederate `Connection` --> `Extended Properties` to use Kerberos.

     You can use the [supplied Powershell script](../Solution-WorkForce/ActiveDirectory) `100-Configure-IntranetSites-in-IE.ps` to set this.

     > If you encounter a problem with untrusted certificates, either trust the PingFederate certificate in the browser as an exception, or add a proper certificate to `SSL Certificates` in PingFederate.

## Test the deployment

There are two dummy OIDC applications you can use to test SSO. The OAuth configuration for the applications is:

  * `authorization code`, `implicit`, and `refesh token` grants.
  * `Issuer`: localhost
  * `client_id`: PingLogon
  * `client_secret`: 2FederateM0re
  * Client Credentials:
    - `client_id`: cc_secret_client
    - `client_secret`: 2FederateM0re
  * Introspection:
  - `client_id`: PingIntrospect
  - `client_secret`: 2FederateM0re

  1. Go to `https://localhost/idp/startSSO.ping?PartnerSpId=Dummy-SAML` to access the applications.
  2. Use either of these sets of AD user credentials:

    * User1
      - User: pinguser1
      - Password: 2FederateM0re
    * User2
      - User: pinguser2
      - Password: 2FederateM0re

When you no longer want to run this stack, you can either bring the stack down (recommended), or stop the running stack. Entering:

  `docker-compose down`

will remove all of the containers and associated Docker networks. Entering:

  `docker-compose stop`

will stop the running stack without removing any of the containers or associated Docker networks.

## Using PingID for Self Service Password Reset

PingFederate's HTML Form adapter stores the PingID properties as an encrypted JSON Web Token (JWT), unlike the PingID adapter that uses Base64 encoding. This means that you need to manually import your PingID properties file into the HTML Form.

  > The upload link for the PingID properties file is in the `Advanced Properties` section of the HTML Form adapter, and not located near the Self Service Password Reset (SSPR) settings.

You'll also need to enable PingID as the SSPR method. You won't be able to save the changes to the HTML Form adapter without specifying the PingID properties file.

## (Optional) Use your own AD installation

If you'd rather use your own AD installation, you can use the supplied Powershell scripts in the [ActiveDirectory subdirectory](../Solution-WorkForce/ActiveDirectory/00-Install-and-Configure-Domain-Controller) to configure AD for use with the Workforce stack. These scripts:

  * Add AD Domain Services (`00-Install-ADDomainServices.ps`).
  * Create and configure a new AD forest (`01-New-ADForest.ps` and `02-Post-ADForest-Config.ps`).
  * Configure the Organizational Units (OUs) (`10-Create-PingOUs.ps`).
  * Create a Ping Identity service user and Service Principal Name (`11-Create-PingServiceUser.ps`).
  * Add a set of domain groups and users (`15-Create-PingUsers.ps` and `16-Create-PingGroups.ps`).
  * Add a Certificate Authority and configure a certificate enrollment policy (`20-Add-Certificate-Server.ps` and `21-Configure-CertEnrollmentPolicy.ps`).

### Domain users

The Ping Identity service accounts and the user accounts are identified by `cn=pingfederate,ou=ServiceAccounts,...` and `cn=pinguser1,ou=UserAccounts,...`. The password for the user accounts is: `2FederateM0re`.

### Certificate Authority

The Certificate Authority is used by the Domain Controller (DC) to get certificates used by LDAPS, and for future use cases employing Windows devices or user certificates (such as smart cards).

### DNS

If you'll be using AD Domain-Joined machines (to demonstrate Kerberos integration, for example), you need to name the AD forest or domain something other than your PingFederate host domain name. This domain name for the preconfigured AD installation is `ping-demos.com`. This allows the Domain-Joined machines to resolve the PingFederate URL using the DNS forwarding being done by the DNS server. If you don't use a different domain name for Domain-Joined machines, you'll need to add an `A record` to the DNS server that points to your PingFederate host and IP address.

### Service Principal Name

A Service Principal Name (SPN) is added to the `pingfederate` account (using `11-Create-PingServiceUser.ps`) to allow Kerberos authentication from `workforce-pf.ping-demos.com`.

### LDAPS certificate for PingFederate

For PingFederate to be able to connect over LDAPS, you'll need to export the LDAPS certificate. A good way to do this is:

  1. Use Apache Directory Studio to connect to AD over LDAPS.
  2. Store the certificate for the session.
  3. Export it from Active Directory Studio (Preferences --> Connections --> Certificate Validation --> Temporary Trusted).

     The certificate should show the CN as the Domain Controller <windows> name.

  4. Export this in `.DER` format, then import it into PingFederate.
