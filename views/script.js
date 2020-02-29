console.log(status);
function deleterecord(id) {
   $('#' + id).hide();
   $.post('/admin/deleterecord', { id: id }, (data) => {
      if (data == 'success') {
         notie.alert({ position: "bottom", time: 5, type: "success", text: "Account deleted Sucessfully" });
      }
   });
}
function updaterecord(data) {
   //console.log(data);
   $.post('/admin/getdata', { data }, (responsedata) => {
      console.log(responsedata);
      let dob = responsedata.dob;
      // console.log(typeof(dob));
      let arr = dob.split('/');
      let gender = responsedata.gender;
      if (gender == 'female') {
         let radiobtn = document.getElementById("update_user_gender_female");
         radiobtn.checked = true;
      }
      else {
         let radiobtn = document.getElementById("update_user_gender_male");
         radiobtn.checked = true;
      }
      console.log(arr);
      document.getElementById('update_user_id').value = responsedata.id;
      document.getElementById('update_user_name').value = responsedata.name;
      document.getElementById('update_user_email').value = responsedata.email;
      document.getElementById('update_user_country').value = responsedata.address.country;
      document.getElementById('update_user_state').value = responsedata.address.state;
      document.getElementById('update_user_city').value = responsedata.address.city.cityname;
      document.getElementById('update_user_town').value = responsedata.address.city.cityname;
      document.getElementById('update_user_street').value = responsedata.address.city.streetname;
      document.getElementById('update_user_aadharnumber').value = responsedata.aadharnumber;
      document.getElementById('update_user_birth_year').value = arr[0];
      document.getElementById('update_user_birth_month').value = arr[1];
      document.getElementById('update_user_birth_date').value = arr[2];
      document.getElementById('document_id').value = responsedata._id;
   });
}
let searchParams = new URLSearchParams(window.location.search);
console.log(searchParams);
console.log(searchParams.has('status'));
let param = searchParams.get('status');
console.log(param);
if (param == 'success') {
   notie.alert({ position: "bottom", time: 3, type: "success", text: "Account updated Sucessfully" });
   // param = '';
   // searchParams.delete('status');
   // console.log(searchParams.has('status'));
   setTimeout(() => {
      window.location.href = 'http://localhost:2500/';
   }, 1000);
}