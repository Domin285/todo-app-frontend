**ToDo Frontend — Angular 20**

Frontend aplikacji ToDo zbudowany w Angular 20, z pełnym wsparciem dla:
- formularzy do dodawania i edycji,
- optymistycznych aktualizacji (toggle isDone),
- filtrowania, sortowania i wyszukiwania,
-powiadomień toast (sukces/błąd),
- ciemnego stylu z dynamicznymi komponentami.

**Technologie**

- Angular 20
- TypeScript
- RxJS
- Signals API
- SCSS (komponentowe / modułowe)
- REST API client (HttpClient)

**Wymagane narzędzia**

- Node.js	20.19.5
- npm	10.2.5
- Angular CLI	20.3.10
- System operacyjny	Windows 10
  
**Konfiguracja API**

W pliku _frontend/src/environments/environment.ts_ ustaw adres backendu, np.
_export const environment = { apiUrl: "https://localhost:7040" };_

**Uruchomienie frontendu:**

Zainstaluj zależności:
- npm install

Uruchom frontend: 
- ng serve

_Pamiętaj, aby uruchomić backend, zanim uruchomisz frontend_
  
**Funkcjonalności**

Pobieranie listy zadań:
- automatyczne sortowanie po Id (zgodne z backendem)
- możliwość sortowania po tytule (A→Z, Z→A)
- filtrowanie po statusie (wykonane / niewykonane)
- wyszukiwanie po tytule

Dodawanie nowych zadań:
- walidacja + limity znaków:
  - tytuł: 30 znaków
  - opis: 100 znaków
- opis jest opcjonalny — gdy pusty → wyświetlane ---

Edytowanie istniejących zadań: 
- formularz modalny w linii tabeli
- osobne style pól (custom inputs)

Optymistyczne aktualizacje:
- kliknięcie checkboxa "Wykonane" nie przeładowuje listy
- natychmiast pokazuje zmianę w UI
- jeśli backend zwróci błąd → toast error + rollback

Toasty (sukces / błąd):
- prawy górny róg
- animacje wejścia / wyjścia
- ciemny motyw
- kolory:
  - zielony — sukces
  - czerwony — błąd
