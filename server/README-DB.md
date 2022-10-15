# Informations about Database

## Database Tables

- Table `Manager` - contains ID_Manager(chiave primaria) nameM, surnameM, email, password, salt
- Table `Counter` - contains ID_Counter(chiave primaria), ID_Manager(chiave esterna)
- Table `Service` - contains ID_Service(chiave primaria), description, avarage_time, ID_Manager(chiave esterna)
- Table `Job` - contains ID_Job(chiave primaria), ID_Manager(chiave esterna), ID_Counter(chiave esterna), ID_Service(chiave esterna)
- Table `Ticket` - contains ID_Ticket(chiave primaria), status, numTicket, ID_Service(chiave esterna)

## Notes
- There is already a Manager inside the table
    - email: mariorossi@po.it, password: password
- The status of the table called Ticket can be open/close
