import { getDataRepos, getDataInfo } from "../../getApi.js"


export function createHeader(user){
    const header = document.createElement('div')
    const headerDiv = document.querySelector('.header-div-1')
    const userImg = document.createElement('img') 
    const divInfo = document.createElement('div')
    const userName = document.createElement('h2')
    const userBio = document.createElement('span')
    const headerDivTwo = document.querySelector('.header-div-2')
    const headerBtnOne = document.createElement('button')
    const headerBtnOneLink = document.createElement('a')
   

    header.classList = 'flex-row align-center justify-between header-div-full'
    headerDiv.classList = "header-div-1 flex-row align-center"
    userImg.classList = 'img-user'
    divInfo.classList = 'header-div-1-div'
    userName.classList = "header-user"
    userBio.classList = 'header-job'
    headerBtnOne.classList = 'header-btn-1'
    headerBtnOneLink.classList = 'header-email-link'




    userImg.src = user.avatar_url
    userName.innerText = user.name
    userBio.innerText = user.bio
    headerBtnOneLink.innerText = 'Email'
    headerBtnOneLink.href = `mailto:${user.email}`
  
    divInfo.append(userName, userBio)
    headerDiv.append(userImg, divInfo)
    headerBtnOne.append(headerBtnOneLink)
    headerDivTwo.append(headerBtnOne)
    header.append(headerDiv, headerDivTwo)

    return header
}

export function createMain(userRepo){
    let fullUl = document.querySelector('.list-full')

    userRepo.forEach(element => {
        const card = document.createElement('li')
        const cardTitle = document.createElement('h2')
        const cardDescription = document.createElement('p')
        const cardDiv = document.createElement('div')
        const cardBtnOne = document.createElement('button')
        
        
        card.classList = 'list-card flex-col align-start'
        cardTitle.classList = 'card-title'
        cardDescription.classList = 'card-paragraph'
        cardDiv.classList = 'card-div flex-row'
        cardBtnOne.classList = 'card-btn-1'
        

        cardTitle.innerText = element.name
        cardDescription.innerText = element.description
        cardBtnOne.innerText = 'Repositório'
        

        cardBtnOne.setAttribute('onclick', `location.href='${element.html_url}?'`)

        if(element.homepage != null && element.homepage != ""){
            const cardBtnTwo = document.createElement('button')
            cardBtnTwo.classList = 'card-btn-2'
            cardBtnTwo.innerText = 'Demo'
            cardBtnTwo.setAttribute('onclick', `location.href='${element.homepage}?'`)
            cardDiv.append(cardBtnOne, cardBtnTwo)
            card.append(cardTitle,cardDescription,cardDiv)
            fullUl.append(card)
        }else{
            cardDiv.append(cardBtnOne)
            card.append(cardTitle,cardDescription,cardDiv)
            fullUl.append(card)     
        }     
    });   
    return fullUl
}

export function renderMain(data){
    let main = document.getElementById('mainPrincipal')    
    return main.append(createMain(data))       
}

export function renderHeader(data){
    let header = document.getElementById('head')    
    return header.append(createHeader(data))       
}

export async function requestApiInfo(){
    let getSearch = localStorage.getItem('lastSearch')
    let dataAPI = await getDataInfo(getSearch)
    renderHeader(dataAPI)
}

export async function requestApiRepos(){
    let getSearch = localStorage.getItem('lastSearch')
    let dataAPI = await getDataRepos(getSearch)
    renderMain(dataAPI)
}

requestApiInfo()
requestApiRepos()

