#!/bin/bash

# Skripta koja se pokrece prije instalacije nove aplikacije.
# Zipuje trenutni direktorij i smjesti rezultirajuci zip file van tekuceg direktorija.
# Ime backupa prati pattern backup_danasnjiDatum.zip

zip -r backup.zip .

mv backup.zip ./../backup_$(date +%d-%m-%Y).zip

