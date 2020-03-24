#!/usr/bin/env sh
${VERBOSE} && set -x

# shellcheck source=/dev/null
test -f "${HOOKS_DIR}/pingcommon.lib.sh" && . "${HOOKS_DIR}/pingcommon.lib.sh"
while true ; do
    curl -ss -o /dev/null -k https://pingdirectory/directory/v1 2>&1 && break
    sleep_at_most 8
done
sleep 2

#
# Set the sync pipe at the beginning of the changelog
#
realtime-sync set-startpoint \
    --end-of-changelog \
    --pipe-name AD_Source-to-PD_Destination

#
# Enable the sync pipe
#
dsconfig set-sync-pipe-prop \
    --pipe-name AD_Source-to-PD_Destination  \
    --set started:true \
    --no-prompt