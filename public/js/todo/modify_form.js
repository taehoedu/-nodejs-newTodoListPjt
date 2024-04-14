const modifyForm = () => {
    console.log('modifyForm()')

    let form = document.modify_form;
    if (form.t_title.value === '') {
        alert('INPUT TODO TITLE!!');
        form.t_title.focus();

    } else if (form.t_body.value === '') {
        alert('INPUT TODO BODY!!');
        form.t_body.focus();
        
    } else if (form.t_expiration_date.value === '') {
        alert('SELECT EXPIRATION DATE!!');
        form.t_expiration_date.focus();
        
    } else {
        form.submit();
        
    }

}