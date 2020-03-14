function deleterecord(id) {
   console.log(id);
   $('#' + id).hide();
   $.post('/admin/deleterecord', { id: id }, (data) => {
      if (data == 'success') {
         notie.alert({ position: "bottom", time: 3, type: "success", text: "Account deleted Sucessfully" });    
         setTimeout(() => {
            window.location.href = 'http://localhost:2500/';
         }, 2000);
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
      let imagearr = responsedata.imgurl.split('-');
      console.log(imagearr);
      let gender = responsedata.gender;
      if (gender == 'female') {
         let radiobtn = document.getElementById("update_user_gender_female");
         radiobtn.checked = true;
      }
      else {
         let radiobtn = document.getElementById("update_user_gender_male");
         radiobtn.checked = true;
      }
      // console.log(arr);
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
let param = searchParams.get('status');
if (param == 'success') {
   notie.alert({ position: "bottom", time: 3, type: "success", text: "Account updated Sucessfully" });
   setTimeout(() => {
      window.location.href = 'http://localhost:2500/';
   }, 1000);
}

function sendmailrequest(id) {
   console.log(id);
   let btn = document.getElementById('send_mail_btn');
   btn.addEventListener('click', () => {
      // $('#mailmodel').modal('hide');
      let text = document.getElementById('mailtext').value;
      console.log(text);
      $.post('/admin/sendmail', { id,text }, (responsedata) => {
         // console.log(responsedata);
         if (responsedata.status == 'success') {
            notie.alert({ position: "bottom", time: 3, type: "success", text: `Mail send successfully to ${responsedata.name}`});
         }
         else {
            console.log(responsedata);
         }
      });
   });
}