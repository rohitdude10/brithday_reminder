#!/usr/bin/env python
"""
Script to update ALLOWED_HOSTS in settings.py with the actual hostname.
This is useful for Koyeb deployments where the hostname is dynamically assigned.
"""

import os
import re
import socket

def get_hostname():
    """Get the hostname from the environment or try to determine it."""
    # Try to get from environment
    hostname = os.environ.get('KOYEB_APP_URL')
    if hostname:
        return hostname.replace('https://', '').replace('http://', '')
    
    # Try to get from socket
    try:
        return socket.gethostname()
    except:
        return None

def update_settings():
    """Update the settings.py file with the hostname."""
    hostname = get_hostname()
    if not hostname:
        print("Could not determine hostname, skipping update.")
        return
    
    print(f"Detected hostname: {hostname}")
    
    # Path to settings file
    settings_path = os.path.join(os.path.dirname(__file__), 'birthday_reminder_backend', 'settings.py')
    
    # Read the settings file
    with open(settings_path, 'r') as f:
        content = f.read()
    
    # Check if the hostname is already in ALLOWED_HOSTS
    if f"'{hostname}'" in content or f'"{hostname}"' in content:
        print(f"Hostname {hostname} already in ALLOWED_HOSTS, skipping update.")
        return
    
    # Add the hostname to ALLOWED_HOSTS
    allowed_hosts_pattern = r"(ALLOWED_HOSTS\s*=\s*\[)(.*?)(\])"
    replacement = r"\1\2, '{}'\3".format(hostname)
    updated_content = re.sub(allowed_hosts_pattern, replacement, content, flags=re.DOTALL)
    
    # Write the updated content back to the file
    with open(settings_path, 'w') as f:
        f.write(updated_content)
    
    print(f"Added {hostname} to ALLOWED_HOSTS in {settings_path}")

if __name__ == "__main__":
    update_settings() 