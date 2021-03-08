import React, {useEffect, useRef} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

    var autocomplete;
    var componentForm = {
        street_number:'short name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
    }

    // dynamically load JavaScript files in our html with callback when finished
    const loadScript = (url, callback)=>{
        let script = document.createElement("script");
        script.type = "text/javascript";

        // when script state is ready and loaded or complete we will call callback
        if (script.readState){
            script.onreadystatechange = function(){
                if(script.readyState === "loaded" || script.readyState === "complete"){
                    script.onreadystatechange= null;
                    callback();
                }
            };
        }else{
            script.onload = () => callback();
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    // handle when the script is loaded we will assign autoCompleteRef with google maps place autocomplete
    function handleScriptLoad(autoCompleteRef){
        autocomplete = new window.google.maps.places.Autocomplete(
            autoCompleteRef.current,
            {types: ["geocode"]});
        // add a listener to handle when the place is selected
        autocomplete.addListener('place_changed', ()=>fillInAddress());
    }
    // filling the form fields with the data from google maps
    function fillInAddress(){
        var place = autocomplete.getPlace();
        
        for (var component in componentForm){
            document.getElementById(component).value='';
            document.getElementById(component).disabled = false;
        }
        for (var i=0; i<place.address_components.length;i++){
            var addressType = place.address_components[i].types[0];
            if(componentForm[addressType]){
                var val = place.address_components[i][componentForm[addressType]];
                document.getElementById(addressType).value = val;
            }
        }
    }
    // making the google map only suggest places around the users current location
    // if the geolocation on their browser is on.
    function geolocate(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var circle = new window.google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });
                autocomplete.setBounds(circle.getBounds());
            });
        }
    }


export default function AddressFrom(){

    const autoCompleteRef = useRef(null);
    
    useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=AIzaSyAFIY9KZiIIBPcNwDcyE30rPhCXS0ZNhjY&libraries=places`,
            ()=>handleScriptLoad(autoCompleteRef)
        )
    }, [])
    
    return(
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        autoFocus
                        onFocus={geolocate}                        
                        inputRef = {autoCompleteRef}
                        id="address1"
                        label="Enter your address"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                                             
                        id="street_number"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        id="route"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        id="locality"
                        name="city"
                        label="City"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        id="administrative_area_level_1"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        id="postal_code"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="country"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}