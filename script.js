
let itemsData = [];
document.getElementById('sidebar-open-btn').addEventListener('click', openSidebar)
document.getElementById('sidebar-close-btn').addEventListener('click', closeSidebar)

window.onload = function() {
    getMenu();
}

const api = 'https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json';

async function getMenu() {
    const res = await fetch(api);
    const data = await res.json();
    itemsData = data;
    appendData(itemsData);
}

function TakeOrder(id) {
    let randomItems = [];
    let i=0;
    while(i<3) {
        randomItems.push(itemsData[Math.floor(Math.random()*25)]);
        i++;
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(randomItems.length > 0) {
                resolve(randomItems);
            } else {
                reject('Please make the order again');
            }
        },2500)
    })
}

function orderPrep(ordereditems) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({order_status:true, paid:false});
        }, 1500);
    })
}

function payOrder(status) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const updated_status = {order_status:true, paid:true};
            resolve(updated_status);
        },1000);
    })
}

function thankyouFnc() {
    alert('Thankyou for eating with us today!')
}


function appendData(data) {
    const menu_container = document.getElementById('menu');
    
    data.forEach((item, index) => {
        const menu_item = document.createElement('div');
        menu_item.className = 'menu-item';

        const image = document.createElement('img');
        image.className = 'image';
        // image.src = item.imgSrc;
        image.src = 'https://s3-alpha-sig.figma.com/img/25d6/cb93/f7841f10f589d812f29695ad4fde3fa2?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RosSYbpzZjc87O4DX-my1KAj-1ewLTmoNLz6B6dxRTXYv3Jd8EfwjRXq3BncetK2hCxtSTcSQ-czfrSV0P1YSC9riAqYwfHiG4y3hZkf7BQ7HlbapElJXd2wCAp8JT4v8uRx-d454mXse6zT-2VXj-ckUliN-R6o4RStu650LzxyoMGAtB4PiPFFDjagTCFo9lSfwxc66wkBgItvEz11FgiMBSqASK7424~QxCaK0F6WFn~7I3~dCpWbjWgTl7EueSJhGrU4NhqThk7fD5Ex38xlhTAa~aTyVmv9JoJsWasbDmt-kB6YXFtufXx-ygsSzvWoa5oVH6AdWUb7DS61HQ__';

        const details = document.createElement('div');
        details.className = 'details';

        const name_and_price = document.createElement('div');
        name_and_price.className = 'name&price';

        const item_name = document.createElement('h3');
        item_name.className = 'item-name';
        item_name.innerText = item.name;

        const price = document.createElement('p');
        price.className = 'price';
        price.innerText = `$${item.price}`;

        const addButton = document.createElement('button');
        addButton.className = 'addBtn';
        addButton.innerText = '+';
        addButton.onclick = () => {
            TakeOrder(item.id).then((res) => {
                console.log("Randomly selected three items");
                console.log(res);
                return res;
            })
            .then((res) => {
                orderPrep(res).then((status) => {
                    console.log("status");
                    console.log(status);
                    return status;
                })
                .then((status) => {
                    payOrder(status).then((updated_status) => {
                        console.log("updated_status");
                        console.log(updated_status);
                        thankyouFnc();
                    })
                })
            })
        }

        name_and_price.append(item_name, price);
        details.append(name_and_price, addButton);
        menu_item.append(image, details);

        menu_container.append(menu_item);
    })
}


function openSidebar() {
    const window_width = window.innerWidth;
    console.log('window_width:', window_width);
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.add('toggle-sidebar');
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('toggle-sidebar');
}