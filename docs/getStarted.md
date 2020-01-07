# Get started

The solution stacks for Workforce and CIAM are examples of how customers can quickly deploy DevOps images of Ping Identity solutions for demonstration, testing and proof-of-concept. These images are preconfigured to provide a working, interoperating Docker stack of solutions.

## The Workforce solution stack

The Workforce solution stack is an example of an authentication authority solution, using PingOne for Enterprise, PingID, PingFederate, and PingDirectory. The PingFederate and PingDirectory images are preconfigured. Two dummy applications are preconfigured in PingFederate for testing SSO. You'll need to manually configure the PingOne for Enterprise connection to PingFederate.

The Workforce solution looks like this:

  [image](??)

## The CIAM solution stack


## What you'll do:

You'll need an evaluation license to use the DevOps resources. You'll clone our `pingidentity-solution-stacks` repository, set up your DevOps environment, and deploy either the Workforce or CIAM solution using Docker Compose. When you first start the Workforce or CIAM Docker stacks, the necessary set of DevOps images is automatically pulled from the repository.

  1. Check the prerequisites.
  2. Make a local copy of the DevOps directory, `${HOME}/projects/devops`.
  3. Clone the solution stacks repository, `https://github.com/pingidentity/pingidentity-solution-stacks.git` to your local `${HOME}/projects/devops` directory.
  4. Run our `setup` script in `${HOME}/projects/devops/pingidentity-solution-stacks` to quickly set up the DevOps environment.
  5. Open the `docs/workforce.md` or `docs/ciam.md` documentation for instructions on deploying the solution stack.

  See **Initial setup procedures** for complete instructions.

## Prerequisites

  * A Ping Identity account and a DevOps user name and DevOps key.
  * Either [Docker CE for Windows](https://docs.docker.com/v17.12/install/) or [Docker for macOS](https://docs.docker.com/v17.12/docker-for-mac/install/).
  * [Git](https://git-scm.com/downloads).

## Initial setup procedures

  1. If you've not done so already, save your DevOps user name and key in a text file. It'll look something like this:

     ```text
     PING_IDENTITY_DEVOPS_USER=jsmith@example.com
     PING_IDENTITY_DEVOPS_KEY=e9bd26ac-17e9-4133-a981-d7a7509314b2
     ```

     > Be sure to use the exact variable names.

  2. Make a local copy of the DevOps repository in this location: `${HOME}/projects/devops`.
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

  5.
