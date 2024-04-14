const signinForm = () => {
    console.log('signinForm()');
    
    let form = document.signin_form;
    if (form.m_id.value === '') {
        alert('INPUT MEMBER ID!!');
        form.m_id.focus();

    } else if (form.m_pw.value === '') {
        alert('INPUT MEMBER PW!!');
        form.m_pw.focus();
        
    } else {
        form.submit();

    }

}