from django.db import models


# Create your models here.
class ScoreRecordItem(models.Model):
    username = models.CharField(max_length=100)
    score = models.IntegerField()
    created = models.DateTimeField(auto_now=True)
