Function GetPar(parametro)
	x=len(parametro)
	parametro=parametro & "="
	attr=window.parent.location.href
	if InStr(1,attr,parametro)<>0 then
		attr=right(attr,len(attr)-InStr(1,attr, parametro)-x)
	else
		attr=""
	end if
	if InStr(1,attr,"&")<>0 then
		attr=left(attr,InStr(1,attr,"&")-1)
	end if
	GetPar=attr
End Function

dim t(100,1)
j=0
			   
Function ModArr(id, valore)
	i=0
	if id <> "" and valore <> "" then
		if j > 0 then
			do while t(i,0) <> ""
				if t(i,0) = id then
					t(i,1) = valore
					Ret=true
					exit do
				end if
				i = i+1
			loop
		end if

		'Aggiungo
		if not (Ret=true) then
			t(j,1)= valore
			t(j,0)= id
			j=j+1
		end if
	end if
End Function

Function Buy(perc)
	'str=perc & "flag=add&IDCAT="+GetPar("IDCAT")+"&IDPROD="+GetPar("IDPROD")+"&quant="+quant.value+"&var="
	str=perc & "IDPROD="+GetPar("IDPROD")+"&quant="+quant.value+"&var="
	i=0
	if j > 0 then
		do while t(i,0) <> ""
			str = str + t(i,1) + " "
			i = i+1
		loop
	end if

	if(GetPar("lang")<>"") then str=str+"&lang="+GetPar("lang")
	Buy=str
End Function

Function Agg(perc)
	str=perc 
	if(GetPar("lang")<>"") then str=str+"&lang="+GetPar("lang")
	Agg=str
End Function