from django.urls import include,path
from . import views
from django.contrib import admin
from .views import addCartView



urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name = "note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("user/addCart/", addCartView.as_view(), name="addCart"),
    path("user/addCart/<int:pk>/", addCartView.as_view(), name="addCart"),

]