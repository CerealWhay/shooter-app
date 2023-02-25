from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import ScoreRecordItem
from .serializers import ScoreRecordItemSerializer


@api_view(['GET'])
def getData(request):
    items = ScoreRecordItem.objects.all()
    serializer = ScoreRecordItemSerializer(items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def addData(request):
    serializer = ScoreRecordItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response({'error': 'wrong data'}, 400)
