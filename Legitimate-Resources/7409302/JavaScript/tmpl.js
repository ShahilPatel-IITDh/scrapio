
  {{ if (isValid) { }} 
  <p> 
    As of {{=date}}, there were
  </p>

    <table id="zip-result-tbl">
      <tr>
        <td><span class="covid-stat-tbl"><strong>{{= posPer1000 }}</strong></span><span class="covid-stat-mini-label"><strong>positive tests</strong> per thousand people</span></td>

        <td><span class="covid-stat-tbl"><strong>{{= deaPer1000 }}</strong> </span><span class="covid-stat-mini-label"><strong>deaths</strong> per thousand people</span></td>
      </tr>
      <tr>
        <td><span class="covid-stat-mini-label"><em>{{=cityCompareVal }} {{=cityCompareText }}<br>city average</em></span></td>
        <td><span class="covid-stat-mini-label"><em>{{=cityCompareValDea }} {{=cityCompareTextDea }}<br>city average</em></span></td>
      </tr>

    </table>
    
  <p>
    in the 
      {{ if (zip === "11249" || zip === "11211") { }}
        11211 and 11249 ZIP codes of
      {{ } else { }}
        {{=zip}} ZIP code of 
    {{ } }} 
    {{=borough}}.
  </p>
    
  <p>
    In total, {{= commatize(testPositive) }} of the {{= commatize(testTotal) }} people tested had a positive result; {{= commatize(deathTotal) }} people who tested positive have died. Note: Only a minority of people who show symptoms are tested, so the actual number of positive cases is higher.
  </p>
  {{ } else{ }} 
    <p> We don’t have data for that location. Please enter a New York City ZIP code. </p>
  {{ } }}
