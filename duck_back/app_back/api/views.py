from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import ScoreRecordItem
from .serializers import ScoreRecordItemSerializer


@api_view(['GET'])
def getData(request):
    items = ScoreRecordItem.objects.all().order_by('-score').values()
    serializer = ScoreRecordItemSerializer(items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def addData(request):
    serializer = ScoreRecordItemSerializer(data=request.data)
    if serializer.is_valid():
        user = ScoreRecordItem.objects.filter(username=serializer.validated_data['username'])
        if user.exists():
            if serializer.validated_data['score'] > user.first().score:
                serializer.update(user.first(), serializer.validated_data)
            return Response(serializer.validated_data)
        else:
            serializer.save()
        return Response(serializer.validated_data)
    else:
        return Response({'error': 'wrong data'}, 400)
