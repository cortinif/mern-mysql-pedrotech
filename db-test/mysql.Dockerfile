FROM mysql:5.7

ARG local_cnf_path='./mysql/'
ARG docker_cnf_path='/etc/mysql/mysql.conf.d/'
ARG mysqld_old='mysqld.cnf'
ARG mysqld_new='my.cnf'

# Imposta i permessi corretti per la directory dei dati e dei log
RUN chown -R mysql:mysql /var/lib/mysql \
    && chmod -R 755 /var/lib/mysql

# Copia il file di configurazione personalizzato nel container
RUN mkdir -p ${docker_cnf_path}
RUN rm -f ${mysqld_cnf_path}${mysqld_old}
RUN rm -f ${mysqld_cnf_path}${mysqld_new}
COPY ${local_cnf_path}${mysqld_old} ${docker_cnf_path}${mysqld_old}

# Espone la porta 3306 per MySQL
EXPOSE 3306

# Specifica il comando di avvio per il container
CMD ["mysqld"]