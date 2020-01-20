# Get started

Before deploying any of our solution profiles, you need to set up our DevOps environment. This will ensure your successful deployments and give you access to our DevOps resources.

## Prerequisites

  * A Ping Identity account and a DevOps user name and key.
  * A DevOps evaluation license or existing product licenses for the products in the stack.
  * For the Workforce solution stack: Either [Docker CE for Windows](https://docs.docker.com/v17.12/install/) or [Docker for macOS](https://docs.docker.com/v17.12/docker-for-mac/install/).
  * For the Customer solution stack: A local machine running Docker with advanced settings, or Docker running on a virtual host (such as a Scalr instance). See [Customer prerequisites](customer.md) for more detailed requirements.
  * [Git](https://git-scm.com/downloads).

## What you'll do

You'll need a DevOps evaluation license or an existing product license to use the DevOps resources. You'll clone our `pingidentity-solution-stacks` repository, set up your DevOps environment, and deploy a solution profile stack using Docker Compose. When you first start one of our stacks, the necessary set of product images is automatically pulled from the repository.

  1. Create the `${HOME}/projects/devops` directory, if it doesn't already exist.
  2. Clone the solution stacks repository, `https://github.com/pingidentity/pingidentity-solution-stacks.git` to your local `${HOME}/projects/devops` directory.
  3. Run our `setup` script in `${HOME}/projects/devops/pingidentity-solution-stacks` to quickly set up the DevOps environment.
  4. (Recommended) Set up a local Docker volume to persist state and data.
  5. Go to the [Workforce solution profile instructions](workforce.md) or [Customer solution profile instructions](customer.md) to deploy the stack for either of these profiles.

  See **Initial setup procedures** for complete instructions.

## DevOps registration

When you register for our DevOps program, you are issued credentials that will automate the process of retrieving a DevOps evalution license. If you already have a product license or licenses for the Ping Identity products you'll be using, you can use your existing license instead of the DevOps evaluation license. In this case, see **Using your existing product license**.

  > Evalution licenses are short-lived and *not* intended for use in production deployments.

  1. [Create a Ping Identity account, or sign on to your existing account](https://www.pingidentity.com/en/account/sign-on.html).
  2. You'll need a DevOps user name and DevOps key. Your DevOps user name is the email address associated with your Ping Identity account. Request your DevOps key using this [form](https://docs.google.com/forms/d/e/1FAIpQLSdgEFvqQQNwlsxlT6SaraeDMBoKFjkJVCyMvGPVPKcrzT3yHA/viewform).

      Your DevOps user name and key will be sent to your email. This will generally take only a few business hours.

  3. Save your DevOps user name and key in a text file. It'll look something like this:

     ```text
     PING_IDENTITY_DEVOPS_USER=jsmith@example.com
     PING_IDENTITY_DEVOPS_KEY=e9bd26ac-17e9-4133-a981-d7a7509314b2
     ```

     > Be sure to use the exact variable names.

     When you initially deploy a product container or stack, the DevOps evaluation license will be automatically retrieved.

### Use an existing product license

If you have an existing, valid product license for the product or products you'll be running, you can use this instead of the DevOps evaluation license. Use either of these two methods to make an existing product license file available to your deployment:

  * Copy each license file to the server profile location associated with the product. The default server profile locations are:
    - PingFederate: `instance/server/default/conf/pingfederate.lic`
    - PingAccess: `instance/conf/pingaccess.lic`
    - PingDirectory: `instance/pingdirectory.lic`
    - PingDataGovernance: `instance/pingdatagovernance.lic`
    - PingDataSync: `instance/pingdatasync.lic`
    - PingCentral: `instance/conf/pingcentral.lic`

  * For our Docker stacks, copy each license file to the `/opt/in` volume that you've mounted. The `/opt/in` directory overlays files onto the products runtime filesystem, the license needs to be named correctly and mounted in the exact location the product checks for valid licenses.

    1. Add a `volumes` section to the container entry for each product for which you have a license file in the `docker-compose.yaml` file you're using for the stack:

      * For the Workforce stack, the `docker-compose.yaml` file is in the [Solution-WorkForce](../Solution-WorkForce) directory.
      * For the Customer stack, the `docker-compose.yaml` file is in the [Solution-BaselineCustomer](../Solution-BaselineCustomer) directory.

    2. Under the `volumes` section, add a location to mount `opt/in`. For example:

       ```yaml
       pingfederate:
       .
       .
       .
       volumes:
         - <path>/pingfederate.lic:/opt/in/instance/server/default/conf/pingfederate.lic
       ```

       Where <path> is the location of your existing PingFederate license file.

       When the container starts, this will bind mount `<path>/pingfederate.lic` to this location in the container`/opt/in/instance/server/default/conf/pingfederate.lic`. The mount paths must match the expected license path for the product. These are:

       * PingFederate
         - Expected license file name: `pingfederate.lic`
         - Mount Path: `/opt/in/instance/server/default/conf/pingfederate.lic`

       * PingAccess
         - Expected license file name: `pingaccess.lic`
         - Mount Path: `opt/in/instnce/conf/pingaccess.lic`

       * PingDirectory
         - Expected License file name: `PingDirectory.lic`
         - Mount Path: `/opt/in/instance/PingDirectory.lic`

       * PingDataSync
         - Expected license file name: `PingDirectory.lic`
         - Mount Path: `/opt/in/instance/PingDirectory.lic`

       * PingDataGovernance
         - Expected license file name: `PingDataGovernance.lic`
         - Mount Path: `/opt/in/instance/PingDataGovernance.lic`

       * PingCentral
         - Expected license file name: `pingcentral.lic`
         - Mount Path: `/opt/in/instance/conf/pingcentral.lic`

    3. Repeat this process for the remaining container entries for which you have an existing license.

## Initial setup procedures

  1. Create this directory, if it doesn't already exist: `${HOME}/projects/devops`.

     For example, enter:

     ```text
     mkdir -p ${HOME}/projects/devops
     cd ${HOME}/projects/devops
     ```
     > A common location will make it easier for us to help you if issues occur.

  3. Clone the DevOps repository to the `${HOME}/projects/devops` directory on your local machine:

       `git clone https://github.com/pingidentity/pingidentity-solution-stacks.git`

  4. Run our `setup` script to quickly and easily set up your local DevOps environment for the solution stacks. For example, enter:

     ```text
     cd pingidentity-solution-stacks
     ./setup
     ```
     You're prompted to verify your DevOps user name and key.

     You can safely ignore the warnings that display when the setup script finishes.

  5. Go to either the [Workforce solution profile instructions](workforce.md) or [Customer solution profile instructions](customer.md) to deploy the stack for the profile.

## Save your configuration changes

Set up a local Docker volume to persist state and data for the stack whenever you bring the stack down. This will enable you to save any configuration changes you make to the product instances running in the stack. If you don't do this, the next time you bring up the stack, you'll need to repeat any configuration changes you might have made.

You'll need to bind a Docker volume location to the Docker `/opt/out` directory for the container. Our Docker instances use the `/opt/out` directory to store application data. To do this, for each container in the stack:

  1. Add a `volumes` section to the container entry in the `docker-compose.yaml` file you're using for the stack.

  2. Under the `volumes` section, add a location to persist your data. For example:

     ```yaml
     pingfederate:
     .
     .
     .
     volumes:
       - /tmp/compose/pingfederate_1:/opt/out
     ```

  3. In the `environment` section, comment out the `SERVER_PROFILE_PATH` setting. The container will then use your `volumes` entry to supply the product state and data, including your configuration changes.

     When the container starts, this will bind mount `/tmp/compose/pingfederate_1` to the `/opt/out` directory in the container. You're also able to view the product logs and data in the `/tmp/compose/pingfederate_1` directory.

 4. Repeat this process for the remaining container entries in the stack.
