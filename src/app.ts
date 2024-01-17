import axios from 'axios';

declare var google: any;

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_API_KEY = 'AIzaSyAuvliEf0nFQa-ItwAO61qoO18luHELVKE';

type GoogleResponse = {
	results: { geometry: { location: { lat: number; lng: number } } }[];
	status: 'OK' | 'ZERO_RESULTS';
};

const searchAddressHandler = (event: Event) => {
	event.preventDefault();
	const enteredAddress = addressInput.value;

	axios
		.get<GoogleResponse>(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
				enteredAddress
			)}&key=${GOOGLE_API_KEY}`
		)
		.then(resp => {
			if (resp.data.status !== 'OK') {
				throw new Error('Could not fetch location!');
			}
			const coords = resp.data.results[0].geometry.location;

			const map = new google.maps.Map(document.getElementById('map'), {
				center: coords,
				zoom: 10,
			});

           new google.maps.Marker({
                map: map,
                position: coords,

              });
		})
		.catch(err => alert(err.message));
};

form.addEventListener('submit', searchAddressHandler);
