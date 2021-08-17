from django.urls import path
from .views import LeafDiseaseViewSet, LeafDatasetViewSet, Index

urlpatterns = [
    path('', Index),
    path('leaf', LeafDiseaseViewSet.as_view()),
    path('delete-leaf/<int:pk>', LeafDiseaseViewSet.as_view()),
    path('leaf-library/', LeafDatasetViewSet.as_view()),
    path('delete-library/<int:pk>', LeafDatasetViewSet.as_view())
]