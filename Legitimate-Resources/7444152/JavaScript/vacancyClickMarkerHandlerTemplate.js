
            <h3><%:city%></h3>
<p><%if count > 1%><%trans:"In this city are %s vacancies" count%><%else%><%trans:"In this city is %s vacancy" count%><%/if%></p>
<a href="<%:overviewUrl%>"
    class="is-btn is-background-color-accent is-width-max is-margin-x-0">
    <%if count > 1%><%trans:"Browse %s vacancies" count%><%else%><%trans:"Browse %s vacancy" count%><%/if%>
</a>
<a href="<%generateCompanyUrl companyId companySlug friendly_url /%>"
    class="is-btn is-background-color-accent is-width-max is-margin-top-10 is-margin-x-0">
    <%trans:"Learn more about our office in %s" city%>
</a>    