from rest_framework import serializers
from base.models import ScoreRecordItem


class ScoreRecordItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScoreRecordItem
        fields = '__all__'
