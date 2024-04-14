const writeForm = () => {
    console.log('writeForm()')

    let form = document.write_form;
    if (form.t_title.value === '') {
        alert('INPUT NEW TODO TITLE!!');
        form.t_title.focus();

    } else if (form.t_body.value === '') {
        alert('INPUT NEW TODO BODY!!');
        form.t_body.focus();
        
    } else if (form.t_expiration_date.value === '') {
        alert('SELECT EXPIRATION DATE!!');
        form.t_expiration_date.focus();
        
    } else {
        form.submit();
        
    }

}