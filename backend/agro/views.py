from django.shortcuts import render
from .models import LeafDisease, CassavaLeafDisease, LeafDataset
from .serializers import LeafDiseaseSerializer, CassavaLeafDiseaseSerializer, LeafDatasetSerializer
from django.http import Http404, HttpResponse, JsonResponse
import json
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from .predictors import predictLeafDisease, predictCassavaLeafDisease
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
import os
from django.core.files.storage import default_storage
from django.conf import settings
from rest_framework.parsers import MultiPartParser, FormParser

def Index(request):
    response = {
        "Message": "Hello From API"
    }
    return JsonResponse(response)

# Create your views here.
class LeafDiseaseViewSet(APIView):
    #  parser_classes = [FileUploadParser]    
    queryset = LeafDisease.objects.all()
    serializer_class = LeafDiseaseSerializer
        
    def get_object(self, pk):
        try:
            return LeafDisease.objects.get(pk=pk)
        except LeafDisease.DoesNotExist:
            raise Http404
        
    def get(self, request, format=None):
        queryset = LeafDisease.objects.all()
        serializer_class = LeafDiseaseSerializer(queryset, many=True)
        return Response(serializer_class.data)
    
    def post(self, request, *args, **kwargs):
        file = request.FILES['photo']
        file_name = default_storage.save(file.name, file)
        
        model_name = "leaf_disease_model.h5"
        # model_name = "my_leaf_disease_model.h5"
        file_path = os.path.join(settings.MEDIA_ROOT, file_name)
        model_path = os.path.join(settings.MODEL_ROOT, model_name) 
        prediction = predictLeafDisease(file_path, 256, model_path)
        
        label = prediction['label']
        data = LeafDisease(label=label, photo=file)
        data.save()
        os.remove(file_path)
        if (prediction['confidence']) >= 40:
            if prediction['label'] == 'Random':
                return HttpResponse(json.dumps({'label': "Plant Leaf not Detected", "confidence": prediction['confidence']}))
            else:
                return HttpResponse(json.dumps(prediction))
        else:
            return HttpResponse(json.dumps({"label": "Unable to Detect,Try to Fit the leaf inside the crop box", "confidence": ''}))

    def delete(self, request, pk, format=None):
        leaf = self.get_object(pk)
        leaf.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
# class CassavaLeafDiseaseViewSet(APIView):
#     queryset = CassavaLeafDisease.objects.all()
#     serializer_class = CassavaLeafDiseaseSerializer
    
#     def get_object(self, pk):
#         try:
#             return LeafDisease.objects.get(pk=pk)
#         except LeafDisease.DoesNotExist:
#             raise Http404
        
#     def get(self, request, format=None):
#         queryset = CassavaLeafDisease.objects.all()
#         serializer_class = CassavaLeafDiseaseSerializer(queryset, many=True)
#         return Response(serializer_class.data)
    
#     def post(self, request, *args, **kwargs):
#         file = request.FILES['photo']
#         file_name = default_storage.save(file.name, file)
#         #  Reading file from storage
#         # file = default_storage.open(file_name)
#         # file_url = default_storage.url(file_name)
#         # model_name = "best_cassava_leaf_disease_model.h5"
#         # model_name = 'best_model.h5'
        
	#     file_path = os.path.join(settings.MEDIA_ROOT, file_name)
    #     model_path = os.path.join(settings.MODEL_ROOT, model_name) 
    #     prediction = predictCassavaLeafDisease(file_path, 512,  model_path)
    #     prediction = str(prediction)
    #     print(prediction)
    #     return HttpResponse(json.dumps({'message': prediction}), status=200)
    
    # def delete(self, request, pk, format=None):
    #     leaf = self.get_object(pk)
    #     leaf.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)    

class LeafDatasetViewSet(APIView):
    queryset = LeafDataset.objects.all()
    serializer_class = LeafDatasetSerializer
    def get_object(self, pk):
        try:
            return LeafDataset.objects.get(_id=pk)
        except LeafDataset.DoesNotExist:
            raise Http404
        
    def get(self, request, format=None):
        queryset = LeafDataset.objects.all()
        serializer_class = LeafDatasetSerializer(queryset, many=True)
        return Response(serializer_class.data)
    
    def post(self, request, *args, **kwargs):
        parser_classes = [MultiPartParser, FormParser]
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            label = serializer.data.get('label')
            leafType = serializer.data.get('leafType')
            details = serializer.data.get('details')
            symptoms = serializer.data.get('symptoms')
            causes = serializer.data.get('causes')
            effects = serializer.data.get('effects')
            management = serializer.data.get('management')        
            image = request.FILES['image']
            data = LeafDataset(label=label, leafType=leafType, details=details, symptoms=symptoms, 
            causes=causes, effects=effects, management=management, image=image)
            data.save()
            return Response(LeafDatasetSerializer(data).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
    
    def delete(self, request, pk, format=None):
        leafdataset = self.get_object(pk)
        print(leafdataset)
        leafdataset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def patch(self, request, pk, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            label = serializer.data.get('label')
            leafType = serializer.data.get('leafType')
            details = serializer.data.get('details')
            symptoms = serializer.data.get('symptoms')
            causes = serializer.data.get('causes')
            effects = serializer.data.get('effects')
            management = serializer.data.get('management')        
            image = request.FILES['image']
            queryset = self.get_object(pk)
            data = queryset
            data.label = label
            data.leafType = leafType
            data.details = details
            data.symptoms = symptoms
            data.causes = causes
            data.effects = effects
            data.management = management
            data.image = image
            data.save(update_fields=['label', 'leafType', 'details','symptoms', 'causes', 'effects', 'management', 'image'])
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
