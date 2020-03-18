## Docker Compose deployment

### Pre-Requisites
* [Docker](https://www.docker.com/get-started)
* [Docker-Compose](https://docs.docker.com/compose/install/)
* [Ping DevOps - Compose](https://pingidentity-devops.gitbook.io/devops/deploy/deploycompose)

### Configuration
* Copy the `docker-compose.yaml`, `env_vars` and `postman_vars.json` files to a folder
* Modify the `env_vars` file to match your environment
* Modify the `postman.json` file to match your environment
* Launch the stack with `docker-compose up -d`
* Logs for the stack can be watched with `docker-compose logs -f`
* Logs for individual services can be watched with `docker-compose logs -f {service}`

### Configuration Variables
Variables defined in `postman_vars.json` to override the Collection defaults

**Collection Defaults**
| Variable | Description | Default |
| -------- | ----------- | ------- |
| `pfAdminURL` | PingFed Administration URL | https://pingfederate:9999 |
| `pdAdminUrl` | PingDir Administration URL | https://pingdirectory:443 |
| `pfAdmin` | PingFed API Admin Account | api-admin |
| `pfAdminPwd` | PingFed Admin Password| {{globalPwd}} |
| `pdAdmin` | PingFed Admin Account | cn=dmanager |
| `pdAdminPwd` | PingDir Admin Password| {{globalPwd}} |
| `oauthSecret` | PingLogon Client Secret | {{globalPwd}} |
| `pfAuthnApiUrl` | PF AuthN App URL | {{pfBaseURL}}/pf-ws/authn/explorer |
| `globalPwd` | Common Password | 2FederateM0re |

**`postman_vars.json`**
| Variable | Description | Customer Values |
| -------- | ----------- | ------- |
| `pfBaseURL` | PingFed Runtime URL | https://{{your PF public FQDN}}:9031 |
| `pingIdSdk` | PingID SDK Properties  | Your SDK Properties file |
| `sdkAppId` | PID SDK Application ID | Your SDK App ID |

**`env_vars`**
| Variable | Description | Customer Values |
| -------- | ----------- | ------- |
| `PING_IDENTITY_ACCEPT_EULA` | Ping Identity EULA | YES |
| `PF_LOG_LEVEL` | PingFed Logging Level | INFO or DEBUG |
| `USER_BASE_DN` | Root of the LDAP tree | dc=customer360.com |
| `PF_USER_PWD` | Password for PF Service Account | `pfAdminPwd` |