/**
 * Vortex constructor
 * 
 * @param element JSON to load
 * @param json_url JSON to load
 * 
 */
Vortex=function(element, json_url) {
    var _this=this;
    this.element=element.querySelector('.dsg_o_vortex .dsg_vortex-questions');
    this.pagination=element.querySelector('.dsg_o_vortex .dsg_vortex-pagination');
    this.length=0;
    this.c_length=0;
    this.c_index=0;
    this.result={};
    this.questions=[];
    this.url_redirection="#";

    // Go to next question
    this.next=function(next_id) {
        if(next_id && next_id!=="false") {
            // Show next question
            var active = this.element.querySelector(".-dsg_active_question");
            active.classList.remove("-dsg_active_question");
            var next = this.element.querySelector(".dsg_vortex-question[data-qid=\""+next_id+"\"]");
            next.classList.add("-dsg_active_question");
            this.c_index += 1;
            this.update_pagination();
        } else {
            // Last question, redirection...
            window.location.href = _this.url_redirection + "#data=" + btoa(JSON.stringify(this.result));
        }
    };

    // Go to previous question or to the question's number pass as param 
    this.back=function(to) {
        // return; // disable function
        if(typeof to == "undefined") to = this.c_index - 1;
        if(to<0 || to>=this.c_index) return;
        var active = this.element.querySelector(".-dsg_active_question");
        active.classList.remove("-dsg_active_question");
        for(var i=this.c_index;i>to;i--) {
            this.result[i]={};
            this.questions[i]={};
            this.c_index-=1;
        }                
        this.c_length=to;
        this.update_pagination();
        this.element.querySelector(".dsg_vortex-question[data-index='"+to+"']").classList.add("-dsg_active_question");
    };

    this.update_pagination=function() {
        if(this.pagination.lastElementChild == null && this.length > 0) {
            // Pagination vide, création des bullets
            for(var i=0; i<this.length;i++) {
                var b = document.createElement("i");
                b.classList.add("dsg_vortex-pagination_bullet");
                b.innerText=i+1;
                b.dataset.index=i;
                (function(to) {
                    b.addEventListener("click", function() {
                        _this.back(to);
                    })
                })(i);
                this.pagination.appendChild(b);
            }
        } else if(this.pagination.lastElementChild == null) {
            return;
        } else if(this.pagination.lastElementChild.dataset.index < this.length-1) {
            // Pagination incomplête, création des bullets manquants
            while(this.pagination.lastElementChild.dataset.index < this.length-1) {
                var b = document.createElement("i");
                b.classList.add("dsg_vortex-pagination_bullet");
                b.innerText= parseInt(this.pagination.lastElementChild.dataset.index,10) + 2;
                b.dataset.index= parseInt(this.pagination.lastElementChild.dataset.index,10) + 1;
                this.pagination.appendChild(b);
            }
        } else if(this.pagination.lastElementChild.dataset.index > this.length-1) {
            // Pagination trop grande, suppression de certains bullets
            while(this.pagination.lastElementChild.dataset.index > this.length-1) {
                this.pagination.removeChild(this.pagination.lastElementChild);
            }
        }
        
        // Pagination ok, update active
        if(this.pagination.querySelector(".-dsg_active_pagination")) this.pagination.querySelector(".-dsg_active_pagination").classList.remove("-dsg_active_pagination");
        this.pagination.querySelector(".dsg_vortex-pagination_bullet[data-index='"+this.c_index+"']").classList.add("-dsg_active_pagination");
    }

    /**
     * @param {Object} question Question data to buil
     * @param {Object} [previous] Element the question will be insrted after
     */
    this.build_question=function(question, previous) {
        var container = document.createElement("div");
        container.classList.add("dsg_vortex-question");
        container.dataset.qid = question.id;
        if(this.c_length===0) container.classList.add("-dsg_active_question");

        // remove question with same index
        if(this.element.querySelector(".dsg_vortex-question[data-index='"+this.c_length+"']") != null) {
            this.element.querySelector(".dsg_vortex-question[data-index='"+this.c_length+"']").remove();
        }

        container.dataset.index = this.c_length++;

        var q = document.createElement("h3");
        q.classList.add("dsg_a_title");
        q.dataset.id = question.id;
        q.innerText = question.text;
        q.data = question;

        container.appendChild(q);
        if(previous) this.element.querySelector(".dsg_vortex-question[data-qid='" + previous.id + "']").insertAdjacentElement('afterend',container);
        else this.element.appendChild(container);

        this.questions[this.length] = question;
        if(typeof question.etapes != "undefined") this.length=question.etapes;
        if(question.hasOwnProperty("redirection") && question.redirection) _this.url_redirection=question.redirection;
        this.update_pagination();
        
        var rs_container = document.createElement("div");
        question.reponses.forEach(function(reponse) {
            rs_container.classList.add("dsg_vortex-reponses");
            rs_container.classList.add("dsg_a_text");
            var r_container = document.createElement("button");
            r_container.classList.add("dsg_vortex-reponse");
            r_container.dataset.id = reponse.id;
            r_container.dataset.qid = question.id;
            r_container.data = reponse;
            r_container.onclick = function() {
                _this.result[question.id] = reponse.id;
                if(reponse.hasOwnProperty("redirection") && reponse.redirection) _this.url_redirection=reponse.redirection;
                if(reponse.hasOwnProperty("etapes")) _this.length=reponse.etapes;
                _this.next(reponse.next);
            }

            // Add response icon
            r_container.innerHTML = '<svg class="dsg_vortex-reponse_icon"><use width="100%" height="100%" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/static/Particuliers/rcwb/assets/img/pictos/RCWB_pictotheque-32.svg#'+reponse.icon+'"></use></svg>';
            
            // Create response texte
            var r = document.createElement("span");
            r.innerText = reponse.text;

            r_container.appendChild(r);
            rs_container.appendChild(r_container);
        });
        container.appendChild(rs_container);
    }
    
    this.init=function() {
        this.length=this.data.questions.length;
        // Reset questions
        this.element.innerHTML="";
        // Reset pagination
        this.pagination.innerHTML="";
        // Reset inline display
        element.style.display='';

        this.data.questions.forEach(function(question) {
            _this.build_question(question);
        });
    }

    // Get associated JSON
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            try {
                _this.data = JSON.parse(this.responseText);
                _this.init();
            } catch (e) {
                console.warn("vortex: no input data");
                element.style.display='none';
            }
        }
    };
    xhttp.open("GET", json_url, true);
    xhttp.send();
}

// Init vortex
for (const element of document.querySelectorAll(".dsg_o_vortex[data-json]")) {
    element.vortex=new Vortex(element, element.getAttribute("data-json"));
}
