//import $ from "jquery";
//const $ = jQuery();

    const PRODUCAO = 'producao';
    const  DESENVOLVIMENTO = 'desenvolvimento';
    
    const SAME = 'same';

    const deafultEnviroment =DESENVOLVIMENTO;
//    function deafultEnviroment = DESENVOLVIMENTO;





    function doAnAjaxRequest(uri, callbacks = {}, verb = 'HEAD', requestBody = {},  headers = {}, enviroment = deafultEnviroment, contentType = 'application/json', dataType = 'json') {
        const url = getUrlBackEnd(enviroment);
        ajaxLoading(true);
        const token = this.getToken();
        if(!headers){
            headers = {};
        }

        if (token && token.token) {
            headers['token'] = token.token;
            headers['email'] = token.email;
        }

        $.ajax({
            data: JSON.stringify(requestBody),
            headers,
            url: `${url}/${uri}`,
            contentType,
            type: verb,
            dataType,

            complete: (a) => {
                try {
                    ajaxLoading(false);

                    callbacks[401] = callbacks[401] || getHandler401();

                    callbacks[420] = callbacks[420] || getHandler420();
                   
                    callbacks[403] = callbacks[403] || getHandler403(uri);

                    callbacks[410] = callbacks[410] || getHandler410(uri);

                    const callback = callbacks[a.status] || callbacks['onUnexpectedHttpStatus'] || ((responseBody, httpStatus) => console.log('resposta' + responseBody, 'status imprevisto: ' + httpStatus));
                    
                    const afterHttpRequest = callbacks['afterHttpRequest'] || (() => { });

                    const responseBody = parseToObject(a.responseText);

                    callback(responseBody, a.status);
                    afterHttpRequest(responseBody, a.status);
                } catch (error) {
                    console.error(error);
                }
            }
        });
    }

    
  
   function getHandler401 () {

        let resultado = () => {
            const token = getToken();
            
            sessionStorage.removeItem('sessao');
            const queryParameters = token.email ? `?email=${token.email}&mensagem=sessaoExpirada` : '?mensagem=acessoNegado';
            window.location.href = '#/login' + queryParameters;
        };

        return resultado;
    
    }

    function getHandler420  () {

        let resultado = () => {
            window.location.href = '#/login?mensagem=foraDoHorario';
        };

        return resultado;
    
    }


    function getHandler403 (uri) {

        let resultado = (reason) => {
            const email = uri.split('/')[1];
            if(!email){
                return;
            }

            sessionStorage.removeItem('sessao');
            const queryParameters = `?email=${email}&msgType=danger&msgValue=${reason}` ;
            window.location.href = '#/tokenToSetPassword' + queryParameters;
        };

        return resultado;
    }

    function getHandler410 (uri) {

        let resultado = () => {
            const email = uri.split('/')[1];
            if(!email){
                return;
            }
 
            sessionStorage.removeItem('sessao');
            window.location.href = `#/blockedToken?email=${email}`;
            
        };

        return resultado;
    }

  function getEmailFromUrl () {
    alert(window.location.href);
    const x = window.location.href.split('?')[1];
      if(!x){
        return '';
      }

      const array = x.split('&');

      const email = array.filter(y=> y.startsWith('email='));
      if(!email){
          return '';
      }
      return email;
    }
  
    function parseToObject (res)  {
        try {
            res = JSON.parse(res);
            return res;
        } catch (error) {
            return res;
        }
    }


    function ajaxLoading(x) {

        const cover = document.getElementById('cover');
        cover && (cover.style.display = x ? 'block' : 'none');
    }

    function getUrlBackEnd(enviroment = deafultEnviroment) {
        const urls = {
            same: '',
            desenvolvimento: 'http://localhost:3000',
            producao: 'https://ccpjobsnow.com'
        };
        return urls[enviroment] || enviroment;
    }


    function getToken() {
        const sessao = sessionStorage.getItem('sessao');

        try {
            const sessaoObj = JSON.parse(sessao);
            return { ...sessaoObj };
        } catch (error) {
            return {};
        }

    }
   


    