let sqlite = require('sqlite3').verbose();
    const db = new sqlite.Database('app_menu.db', (err) => {
      if (err) {
        document.querySelector("h1").innerHTML = "Une erreur s'est produite lors de la connexion : " + err.message;
        return console.error(err);
      }
      console.log("Connexion a la bdd reussite 'app_menu.db'");
    });

    //var menu={[jhjkm,pooôl$^, pkmkmk,pmkmkmkmk,mmkmkmkm]}

    function itemMenu(){
      const sql = "SELECT * FROM apps_service";
      let textMenu = ""
      db.all(sql, [], (err, rows) => {
        if (err) {
          //alert("Erreur" + err.message);
          return console.error(err.message);
        }
        rows.forEach(row => {
          textMenu += ` <li class="nav-item">
        <a class="nav-link" href="${row.url_menu}"><i class="${row.icon_menu}"></i>&ensp; ${row.name_app}</a>
        </li>`;
        });
        let zoneMenu1 = document.querySelector("#menu1");
        zoneMenu1.innerHTML = textMenu;

        return zoneMenu1;
      })
    }
    itemMenu();

    // Submenu
    function itemSubmenu(){
      const reqSubmenu = "SELECT * FROM apps_submenu";
      let textSubmenu = "";
      db.all(reqSubmenu, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        console.log(rows);
        rows.forEach(row => {
          textSubmenu += `<div class="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
            <a class="dropdown-item" href="${row.submenu_url}">${row.submenu_name}</a>
            </div>`;
        });
        /*let zoneSubmenu =  document.querySelector("#submenu");
        zoneSubmenu.innerHTML = textSubmenu;

        return zoneSubmenu;*/
      })
    }
    itemSubmenu();

    // JSON read
    const fs = require('fs');
    const jsonFile = fs.readFileSync('menu_logz.json', 'utf8');
    const jsonData = JSON.parse(jsonFile);

    console.log(jsonData);