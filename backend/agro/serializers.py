from .models import LeafDisease, CassavaLeafDisease, LeafDataset
from rest_framework import serializers

class LeafDiseaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeafDisease
        fields = ['_id', 'label', 'photo', 'created_At', 'modified']

class CassavaLeafDiseaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CassavaLeafDisease
        fields = ['_id','photo']
        
# class MultipleImagesSerializer(serializers.ModelSerializer):
#      class Meta:
#         model = MultipleImages
#         fields = ['leaf', 'image']
        
class LeafDatasetSerializer(serializers.ModelSerializer):
    # images = MultipleImagesSerializer(required=False)
    class Meta:
        model = LeafDataset
        fields = ['_id','label', 'leafType', 'details','symptoms', 'causes', 'effects', 'management', 'image']
    
    # def create(self, validated_data):
    #     # current_user = self.context["request"].user
    #     print(validated_data)
    #     # Leaf  contains images
    #     if 'leaf_media' in validated_data:
    #         leaf_media = validated_data.pop('leaf_media')
    #         leaf_instance = LeafDataset.objects.create(**validated_data)
    #         for img in leaf_media:
    #             MultipleImages.objects.create(**img, leaf=leaf_instance)
    #         return leaf_instance

    #     # leaf is not containing images
    #     if 'leaf_media'not in validated_data:
    #         leaf_instance = LeafDataset.objects.create(**validated_data)
    #         return leaf_instance