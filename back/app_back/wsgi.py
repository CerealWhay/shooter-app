"""
WSGI config for app_back project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/
"""

import os
import sys

from django.core.wsgi import get_wsgi_application

CURRENT_DIR = os.path.abspath(os.path.dirname(__file__))
sys.path.insert(0, os.path.dirname(CURRENT_DIR))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app_back.settings')

application = get_wsgi_application()
