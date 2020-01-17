# Get started

Before deploying any of our solution profiles, you need to set up our DevOps environment. This will ensure your successful deployments and give you access to our DevOps resources.

## Prerequisites

  * A Ping Identity account and a DevOps user name and DevOps key.
  * For the Workforce solution stack: Either [Docker CE for Windows](https://docs.docker.com/v17.12/install/) or [Docker for macOS](https://docs.docker.com/v17.12/docker-for-mac/install/).
  * For the Customer solution stack: A local machine running Docker and having [?? min. reqs] or Docker running on a virtual host (such as a Scalr instance).
  * [Git](https://git-scm.com/downloads).

## What you'll do

You'll need an evaluation license to use the DevOps resources. You'll clone our `pingidentity-solution-stacks` repository, set up your DevOps environment, and deploy a solution profile stack using Docker Compose. When you first start one of our stacks, the necessary set of product images is automatically pulled from the repository.

  1. Create the `${HOME}/projects/devops` directory, if it doesn't already exist.
  2. Clone the solution stacks repository, `https://github.com/pingidentity/pingidentity-solution-stacks.git` to your local `${HOME}/projects/devops` directory.
  3. Run our `setup` script in `${HOME}/projects/devops/pingidentity-solution-stacks` to quickly set up the DevOps environment.
  4. (Recommended) Set up a local Docker volume to persist state and data.
  5. Go to the [Workforce solution profile instructions](workforce.md) or [Customer solution profile instructions](customer.md) to deploy the stack for either of these profiles.

  See **Initial setup procedures** for complete instructions.

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

  5. (Recommended) Set up a local Docker volume to persist state and data for the stack whenever you bring the stack down. This will enable you to save any configuration changes you make to the product instances running in the stack. If you don't do this, the next time you bring up the stack, you'll need to repeat any configuration changes you might have made.

     You'll need to bind a Docker volume location to the Docker `/opt/out` directory for the container. Docker uses the `/opt/out` directory to store application data. To do this, for each container in the stack:

      a. Add a `volumes` section to the container entry in the `docker-compose.yaml` file you're using for the stack.

      b. Under the `volumes` section, add a location to persist your data. For the example:

         ```yaml
         pingfederate:
           .
           .
           .
           volumes:
             - /tmp/compose/pingfederate_1:/opt/out
         ```

      c. In the `environment` section, comment out the `SERVER_PROFILE_PATH` setting. The container will then use your `volumes` entry to supply the product state and data, including your configuration changes.

         When the container starts, this will bind mount `/tmp/compose/pingfederate_1` to the `/opt/out` directory in the container. You're also able to view the product logs and data in the `/tmp/compose/pingfederate_1` directory.

     c. Repeat this process for the remaining container entries in the stack.

  6. Go to either the [Workforce solution profile instructions](workforce.md) or [Customer solution profile instructions](customer.md) to deploy the stack for the profile.
