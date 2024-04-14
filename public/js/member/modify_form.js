const modifyForm = () => {
    console.log('modifyForm()');
    
    let form = document.modify_form;
    if (form.m_pw.value === '') {
        alert('INPUT MEMBER PW!!');
        form.m_pw.focus();
        
    } else if (form.m_mail.value === '') {
        alert('INPUT MEMBER MAIL!!');
        form.m_mail.focus();
        
    } else if (form.m_phone.value === '') {
        alert('INPUT MEMBER PHONE!!');
        form.m_phone.focus();
        
    } else {
        form.submit();

    }

}

const resetForm = () => {
    console.log('resetForm()');

    $('div.profile_thum_wrap').css('display', 'block');
    $('input[name="profile_thum"]').css('display', 'none');

    document.modify_form.reset();
    
}


$(document).ready(function() {
    console.log( "DOCUMENT READY!!" );

    initEvents();

});

const initEvents = () => {
    console.log('initEvents()');

    $(document).on('change', 'input[name="cover_profile_thum_delete"]', function() {
        console.log('cover_profile_thum_delete CHECKED!!');

        if ($(this).prop("checked")) {
            $('div.profile_thum_wrap').css('display', 'none');
            $('input[name="profile_thum"]').css('display', 'inline-block');

        } else {
            $('div.profile_thum_wrap').css('display', 'block');
            $('input[name="profile_thum"]').css('display', 'none');

        }

    });

    $(document).on('click', 'div.profile_thum_wrap a', function() {
        console.log('profile_thum_wrap CLICKEC!!');

        $('#profile_modal_wrap').css('display', 'block');

    });

    $(document).on('click', '#profile_modal_wrap div.profile_thum_close a', function() {
        console.log('close BTN CLICKEC!!');

        $('#profile_modal_wrap').css('display', 'none');

    });

    $(document).on('click', '#profile_modal_wrap div.pre_btn a', function() {
        console.log('pre_btn BTN CLICKEC!!');

        curIdx--;
        if (curIdx < 0) 
            curIdx = thumNames.length - 1;

        $('#profile_modal_wrap div.thum img').attr('src', `/${loginedMId}/${thumNames[curIdx].PT_NAME}`);

    });

    $(document).on('click', '#profile_modal_wrap div.next_btn a', function() {
        console.log('next_btn BTN CLICKEC!!');

        curIdx++;
        if (curIdx >= thumNames.length) 
            curIdx = 0;

        $('#profile_modal_wrap div.thum img').attr('src', `/${loginedMId}/${thumNames[curIdx].PT_NAME}`);

    });

}