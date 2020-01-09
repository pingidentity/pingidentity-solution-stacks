# Get started

The Workforce and Customer solution profiles are examples of how you can quickly deploy DevOps images of Ping Identity solutions for demonstration, testing and proof-of-concept purposes. These images are preconfigured to provide a working stack of interoperating Docker containers for both the Workforce and Customer use cases.

## The Workforce solution profile

The Workforce solution profile is an authentication authority solution, using PingOne for Enterprise, PingID, PingFederate, and PingDirectory. The PingFederate and PingDirectory images are preconfigured. Two dummy (stubbed) applications are preconfigured in PingFederate for testing SSO. You'll need to manually configure the PingOne for Enterprise connection to PingFederate.

The Workforce solution stack looks like this:

![Workforce solution diagram](workforceStack.png)

## The Customer solution profile

The Customer solution stack looks like this:

![Customer solution diagram](customerStack.png)

## Prerequisites

  * A Ping Identity account and a DevOps user name and DevOps key.
  * For the Workforce solution stack: Either [Docker CE for Windows](https://docs.docker.com/v17.12/install/) or [Docker for macOS](https://docs.docker.com/v17.12/docker-for-mac/install/).
  * For the Customer solution stack: Deploy to an XL Scalr instance [?? need minimal reqs here]
  * [Git](https://git-scm.com/downloads).

## What you'll do:

You'll need an evaluation license to use the DevOps resources. You'll clone our `pingidentity-solution-stacks` repository, set up your DevOps environment, and deploy either the Workforce or CIAM solution using Docker Compose. When you first start the Workforce or CIAM Docker stacks, the necessary set of DevOps images is automatically pulled from the repository.

  1. Create the `${HOME}/projects/devops` directory, if it doesn't already exist.
  2. Clone the solution stacks repository, `https://github.com/pingidentity/pingidentity-solution-stacks.git` to your local `${HOME}/projects/devops` directory.
  3. Run our `setup` script in `${HOME}/projects/devops/pingidentity-solution-stacks` to quickly set up the DevOps environment.
  4. Go to the [Workforce solution profile instructions](workforce.md) or [Customer solution profile instructions](customer.md) to deploy the stack for either of these profiles.

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

  5. Go to either the [Workforce solution profile instructions](workforce.md) or [Customer solution profile instructions](customer.md) to deploy the stack for the profile.
