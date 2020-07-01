# nativetest

1. clone it to local
2. Head to the directory
3. Run ```yarn install```
4. Open up expo on your device, hit the qr code (make sure to run it on the same network)
5. or You can also run it on android emulator.


Features:
1. Form : All of the dropdown list are getting data from API (https://dev.farizdotid.com/api/daerahindonesia/), Confirmation alert showing user data that has been confirmed.
2. Camera : It has 2 options whether user can use their own camera and take snapshot, or choose the image from gallery. When showing chosen image / captured image, it does not upload to any image hosting, I created the feature for uploading to cloudinary (unsigned upload) but I comment it out, since the requirement does not ask any upload feature.
3. Data List : randomuser.me has been used to generate loads of data and seed it to the list. Pagination will always hit the API when user click on next or prev button.
