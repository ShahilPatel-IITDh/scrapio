
    const today = new Date()
    let tomorrow =  new Date()
    tomorrow.setDate(today.getDate() + 1)
    document.getElementById('expire_at').min = tomorrow.toISOString().split('T')[0];
    document.getElementById('expire_at').value = tomorrow.toISOString().split('T')[0];
  