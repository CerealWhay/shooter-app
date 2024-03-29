# Register your models here.
from django.contrib import admin
from .models import ScoreRecordItem


@admin.register(ScoreRecordItem)
class RequestDemoAdmin(admin.ModelAdmin):
    list_display = [field.name for field in ScoreRecordItem._meta.get_fields()]
