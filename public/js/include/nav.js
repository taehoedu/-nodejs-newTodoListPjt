const deleteConfirm = () => {
    console.log('deleteConfirm()');

    if (confirm('DELETE REALLY?')) {
        location.href='/member/delete_confirm';
    }

}