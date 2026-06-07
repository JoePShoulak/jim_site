#!/usr/bin/env bash

# Source this file from bash to add Jim shortcuts:
# source deploy/aliases.sh
#
# Then use:
# deploy hp1
# status hp1
# logs-recent hp1
# cert hp1
# restart hp1

alias deploy='bash deploy/manage.sh deploy'
alias bootstrap='bash deploy/manage.sh bootstrap'
alias up='bash deploy/manage.sh up'
alias down='bash deploy/manage.sh down'
alias restart='bash deploy/manage.sh restart'
alias status='bash deploy/manage.sh status'
alias logs='bash deploy/manage.sh logs'
alias logs-recent='bash deploy/manage.sh logs-recent'
alias cert='bash deploy/manage.sh cert'
alias auth-check='bash deploy/manage.sh auth-check'
alias sudoers='bash deploy/manage.sh sudoers'
alias trust='bash deploy/manage.sh trust'

# Backwards-compatible helpers.
alias source-deploy='bash deploy/manage.sh send'
alias apply-deploy='bash deploy/apply-deploy.sh'
alias jim-package='bash deploy/manage.sh package'
alias jim-copy='bash deploy/manage.sh send'
alias jim-deploy='bash deploy/manage.sh deploy'
