# Aplikacja Fitness

## Opis

Aplikacja Fitness to interaktywna platforma stworzona w technologii React, która umożliwia użytkownikom łatwe zarządzanie swoją dietą oraz monitorowanie postępów w odchudzaniu. Dzięki zastosowaniu systemu autoryzacji JWT, użytkownicy mogą bezpiecznie logować się i korzystać z funkcji zarezerwowanych wyłącznie dla zalogowanych.

## Funkcje

- **Autoryzacja JWT**: Użytkownicy mogą się rejestrować oraz logować do aplikacji, co umożliwia korzystanie z zarezerwowanych funkcji.
- **Automatyczny refresh tokena**: System automatycznie odświeża tokeny uwierzytelniające, co zapewnia nieprzerwaną sesję użytkownika.
- **Kalkulator kalorii**: Umożliwia obliczenie dziennego zapotrzebowania kalorycznego na podstawie takich parametrów jak:
  - Wiek
  - Płeć
  - Wzrost
  - Waga
  - Aktywność fizyczna
- **Podgląd profilu**: Użytkownicy mogą przeglądać swoje dane oraz postępy w odchudzaniu.
- **Program sugerujący dietę**: Na podstawie wprowadzonych danych oraz preferencji dietetycznych, aplikacja rekomenduje odpowiednie plany dietetyczne dostosowane do potrzeb użytkownika.
- **Sentry**: Aplikacja jest zintegrowana z systemem Sentry, który monitoruje działanie aplikacji oraz zbiera informacje o ewentualnych błędach.

## Testy jednostkowe

Aplikacja zawiera testy jednostkowe dla każdego komponentu, aby zapewnić ich poprawne działanie. Testy te pomagają w identyfikacji błędów oraz w weryfikacji, że wszystkie funkcje działają zgodnie z oczekiwaniami. 

## Technologie

- **React**: Użyta do stworzenia interfejsu użytkownika.

