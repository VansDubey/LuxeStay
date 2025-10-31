# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Doubts:
1. Should i create different models to make sure the data is imported in both collections differently
2. Will import the things strating from login better configuration + useContext hook part later 
3.Add the functionality of logout using cookie

todo:
Implementing the photos wala option and implemneting it on the index page (here booking page)


Booking page:
putting css and making it like the square grid sort of

indiviual place page:
structure it
add map
Show more photo option 
type = date

Editing is taking time


//Owner ko database maj find out krne mai time lg rha hai.

//correct perks ki dikkat

//uploading the photos via refrencing from UploadPhotos.jsx to Places.jsx

//Adding the token verifying the database and then updating the dataset to be done

//setting mainphoto logic as on adding all photos must be [0] only, this functionality is not working

//button=>ev.preventdefault

//Deleting page functionality is not completed as it is not deleting photos from the database

//adding price per night and ratings on the homepage

//Google map use in address section

//Bg-black in the showmorephoto page 

//  Single PlacePage=>
// <input type="date"> for checkin nad checkout
//<input type="number"> for number of guests
//making of BookingWidget.jsx

//places in allbookings using populate function

//Just make all the required cahnges and then watch the video from 6:45 till end for the last one changes that it

//Setredirect to bookings page

1. On refreshing the page the useState are again set to empty array to retain them either save the data in localstorage or in the backend
2. .filter() creates a new array and all the items satisfying the condition gets added in the new array

3. <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
✅ grid:

Turns the container into a CSS Grid. It allows items inside to align in rows and columns automatically.
✅ grid-cols-1:

Sets 1 column by default (on mobile or smaller screens).
grid-cols-1 means 1 item per row.
✅ md:grid-cols-2:

On medium screens (from 768px and above), the grid switches to 2 columns.
md: is a responsive breakpoint for medium screens in Tailwind.
✅ lg:grid-cols-3:

On large screens (from 1024px and above), the grid switches to 3 columns.
✅ gap-4:

Adds spacing between grid items.
gap-4 means a gap of 1rem (16px) between each item.
✨ How does it work?

On mobile → 1 item per row.
On tablet → 2 items per row.
On desktop → 3 items per row.

4.
grid: Turns the container into a grid.

grid-cols-{n}: Sets n equal-width columns.

Example: grid-cols-3 → 3 equal columns.
grid-cols-[value]: Custom column sizes.

Example: grid-cols-[2fr_1fr] → First column is twice as wide as the second.
grid-rows-{n}: Sets n equal-height rows.

Example: grid-rows-2 → 2 equal rows.
grid-rows-[value]: Custom row sizes.

Example: grid-rows-[1fr_2fr] → Second row is twice the height of the first.
gap-{n}: Adds space between rows and columns.

Example: gap-4 → 1rem (16px) gap.
row-gap-{n} / col-gap-{n}: Sets gap only between rows or columns.

Example: col-gap-2 → Small gap between columns.
place-items-{value}: Aligns items both vertically and horizontally.

Values: start, center, end.
justify-items-{value}: Aligns items horizontally.

Example: justify-items-center → Centers items horizontally.
items-{value}: Aligns items vertically.

Example: items-start → Aligns items to the top.

5.
You can achieve this by wrapping the place name in an anchor (<a>) tag with a href pointing to Google Maps. Here’s an example in React:

jsx
Copy
Edit
<a 
  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(places.name)}`} 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-blue-500 hover:underline"
>
  {places.name}
</a>

6.
🟢 Step 1: Get a Google API Key
Go to Google Cloud Console:

Visit Google Cloud Console.
Create a new project:

Click on the project dropdown at the top and select New Project.
Give your project a name (e.g., "My Maps Project") and click Create.
Enable the Maps Embed API:

In the search bar at the top, type "Maps Embed API" and select it.
Click Enable.
Get your API Key:

On the left sidebar, click APIs & Services → Credentials.
Click the + CREATE CREDENTIALS button at the top and select API key.
Copy the API key that gets generated — you’ll need it in the next steps!
🔵 Step 2: Add the Map to Your Website
Once you have the API key, you can embed the map on your website using an <iframe>.
Here’s an example code snippet:

html
Copy
Edit
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Location Map</title>
</head>
<body>
    <h1>Location Map</h1>
    <div style="width: 100%; height: 400px;">
        <iframe
            width="100%"
            height="100%"
            style="border: 0"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Taj+Mahal">
        </iframe>
    </div>
</body>
</html>
🟣 Step 3: Replace the API Key and Place Name
Replace YOUR_API_KEY with the API key you copied earlier.
Replace Taj+Mahal with the name of the place you want to show.
For multiple words, replace spaces with + (e.g., "Eiffel Tower" becomes "Eiffel+Tower").

7. new Date() to convert from any datatype to date data type
     date-fns(npm) consisting of functions related to date



8. To achieve this, you need to store the payment status persistently. Since the payment status resets when you navigate back, you can store it in localStorage or manage it in the database.

Solution using localStorage
Modify your code as follows:

1. Update handlePayment function to store payment status
javascript
Copy
Edit
const handlePayment = () => {
  alert('Payment Successful!');
  setIsPaid(true);
  localStorage.setItem(`paymentStatus_${id}`, 'paid'); // Store status in localStorage
  setredirect('/accounts/booking');
};
2. Check localStorage when the component loads
Modify your useEffect to check if the payment is already completed.

javascript
Copy
Edit
useEffect(() => {
  if (id) {
    axios.get('http://localhost:3000/booking').then(response => {
      const foundBooking = response.data.find((booking) => booking._id === id);
      setbooking(foundBooking);

      // Check if payment is already done
      const paymentStatus = localStorage.getItem(`paymentStatus_${id}`);
      if (paymentStatus === 'paid') {
        setIsPaid(true);
      }
    });
  }
}, [id]);

