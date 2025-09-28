from django.shortcuts import render

from django.http import JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
import json


# Create your views here.
def home(request):
    return render(request, 'app1/home.html')  # Render the home.html template with context data

# send email
def send_email(request: HttpRequest):
    if request.method == "POST":
        try:
            # get data from request body with json format
            data: dict = json.loads(request.body)
            email = data.get("email")

            if not email:
                return JsonResponse({"ok": False, "error": "Lacking email"}, status=400)

            # send mail
            print("Sending email to", email)
            send_mail(
                subject= "this email send from web server Nginx + Django",
                message="Hello, this is a test email sent from Django application using Gmail SMTP server after receiving POST request from Nginx.",
                from_email=None,  # GET THE email from variable DEFAULT_FROM_EMAIL in test1/settings.py
                recipient_list=[email],
                fail_silently=False,
            )
            return JsonResponse({"ok": True})
        except Exception as e:
            print("Error sending email:", str(e))
            return JsonResponse({"ok": False, "error": str(e)}, status=500)

    return JsonResponse({"ok": False, "error": "only for POST request"}, status=405)