function date_heure(id)
{
        date = new Date;
        annee = date.getFullYear();
        moi = date.getMonth();
        mois = new Array('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12');
        j = date.getDate();
        jour = date.getDay();
        jours = new Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
        h = date.getHours();
        if(j<10){j='0'+j;}
        if(h<10)
        {
                h = "0"+h;
        }
        m = date.getMinutes();
        if(m<10)
        {
                m = "0"+m;
        }
        s = date.getSeconds();
        if(s<10)
        {
                s = "0"+s;
        }
        resultat = j+'-'+mois[moi]+'-'+annee+'T00:00';
        document.getElementById(id).innerHTML = resultat;
        setTimeout('date_heure("'+id+'");','10000');
        return true;
}