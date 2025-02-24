
((g) => {
    var h,
      a,
      k,
      p = "The Google Maps JavaScript API",
      c = "google",
      l = "importLibrary",
      q = "__ib__",
      m = document,
      b = window;
    b = b[c] || (b[c] = {});
    var d = b.maps || (b.maps = {}),
      r = new Set(),
      e = new URLSearchParams(),
      u = () =>
        h ||
        (h = new Promise(async (f, n) => {
          await (a = m.createElement("script"));
          e.set("libraries", [...r] + "");
          for (k in g)
            e.set(
              k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
              g[k]
            );
          e.set("callback", c + ".maps." + q);
          a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
          d[q] = f;
          a.onerror = () => (h = n(Error(p + " could not load.")));
          a.nonce = m.querySelector("script[nonce]")?.nonce || "";
          m.head.append(a);
        }));
    d[l]
      ? console.warn(p + " only loads once. Ignoring:", g)
      : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
  })({
    key: "AIzaSyAOD9cmyNnmuend4WemM8RK7lnklOnDi9Q",
    v: "weekly",
    // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
    // Add other bootstrap parameters as needed, using camel case.
  });
  
  let map;
  let infoWindow = null;
  
  const UNIFOR_BOUNDS = {
      north: -3.765832,
      south: -3.771791,
      west: -38.482476,
      east: -38.472853
      }
  
  
  async function initMap() {
    const position = { lat: -3.768332, lng: -38.478671 };
    
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  
    map = new Map(document.getElementById("map"), {
      zoom: 17,
      minZoom: 17,
      center: position,
      streetViewControl: false,
      restriction: {
          latLngBounds: UNIFOR_BOUNDS,
          strictBounds: false,
      },
      mapTypeControl: true,
          mapTypeControlOptions: {
            mapTypeIds: ["roadmap"]
          },
      mapId: "DEMO_MAP_ID",
    });
  
    infoWindow = new google.maps.InfoWindow({
      content: "Click the map to get Lat/Lng!",
      position: UNIFOR_BOUNDS,
    });
  
    infoWindow.open(map);
  
   
    map.addListener("click", (mapsMouseEvent) => {
      infoWindow.close();
      infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      });
      infoWindow.setContent(
        JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2),
      );
      infoWindow.open(map);
  
      const lat = mapsMouseEvent.latLng.lat();
      const lng = mapsMouseEvent.latLng.lng();
  
      document.getElementById('latitudeInput').value = lat;
      document.getElementById('longitudeInput').value = lng;
    });
  
    try {
      const response = await fetch('/api/markers');
      const markers = await response.json();
      markers.forEach(marker => {
          const newMarker = new AdvancedMarkerElement({
              map: map,
              position: { lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) },
              title: marker.name
          });
          adicionarLinhaTabela(marker.name, marker.lat, marker.lng, newMarker);
      });
  } catch (error) {
      console.error('Erro ao carregar marcadores:', error);
  }
  
    
  }
  
  async function addMarker() {
    const lat = parseFloat(document.getElementById("latitudeInput").value);
    const lng = parseFloat(document.getElementById("longitudeInput").value);
    const nome = document.getElementById("nomeInput").value;
  
    if (isNaN(lat) || isNaN(lng) || !nome) {
  
      if(isNaN(lat) || isNaN(lng)){
        alert("Digite coordenadas válidas!");
      }
      if(!nome){
        alert("Coloque um nome para seu marcador!");
      }
      return;
    }
  
    
  
  
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  
    const marker = new AdvancedMarkerElement({
      map: map, // Usa o mapa global
      position: { lat: lat, lng: lng }, // Posição dos inputs
      title: nome, // Nome do input
    });
  
    map.setCenter({ lat: lat, lng: lng });
  
    adicionarLinhaTabela(nome, lat, lng, marker);
    document.getElementById("latitudeInput").value = "";
    document.getElementById("longitudeInput").value = "";
    document.getElementById("nomeInput").value = "";
  
    if(infoWindow){
      infoWindow.close()
    }
    
  }
  
  
  function adicionarLinhaTabela(nome, lat, lng, ponto) {
    const tbody = document.getElementById('pontos-body');
  
      const newRow = document.createElement('tr');
  
      const nomeCell = document.createElement('td');
      nomeCell.textContent = nome;
  
      const latCell = document.createElement('td');
      latCell.textContent = lat;
  
      const lngCell = document.createElement('td');
      lngCell.textContent = lng;
  
      const actionCell = document.createElement('td');
      const botaoIr = document.createElement('button');
      botaoIr.textContent = 'Ir até o ponto';
      botaoIr.addEventListener('click', () => {
          map.setCenter({ lat: lat, lng: lng });
          map.setZoom(20); 
      });
      actionCell.appendChild(botaoIr);
  
      const botaoExcluir = document.createElement('button');
      botaoExcluir.textContent = 'Excluir';
      botaoExcluir.style.marginLeft = '10px'; 
      botaoExcluir.addEventListener('click', async () => {
          ponto.setMap(null);
          tbody.removeChild(newRow);

          const response = await fetch(`/api/markers/search?name=${name}&lat=${lat}&lng=${lng}`, {
            method: 'DELETE'
          });
    
          if (!response.ok) {
            throw new Error('Falha ao excluir marcador');
          }
    
          if(infoWindow) infoWindow.close();
          
        } 

      )
      
      actionCell.appendChild(botaoExcluir);
  
      
  
      newRow.appendChild(nomeCell);
      newRow.appendChild(latCell);
      newRow.appendChild(lngCell);
      newRow.appendChild(actionCell);
  
      tbody.appendChild(newRow);
  }
  
  
  
  window.initMap = initMap();
      