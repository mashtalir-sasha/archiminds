<?
	if(isset ($_POST['title'])) {$title=$_POST['title'];}
	if(isset ($_POST['name'])) {$name=$_POST['name'];}
	if(isset ($_POST['phone'])) {$phonenum=$_POST['phone'];}

	$to = "info@archiminds.pro"; // Замениь на емаил клиента

	$message = "Форма: $title <br><br>";
	if ( $name || $phonenum || $email ) {
		$message .= ""
			. ( $name ?" Имя:  $name <br>" : "")
			. ( $phonenum ?" Телефон:  $phonenum <br>" : "");
	}

	$headers = "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text/html; charset=UTF-8\r\n";
	$headers .= "From: no-reply@archiminds.pro"; // Заменить домен на домен клиента

	if (!$title && !$phonenum) {
	} else {
		mail($to,"New lead(archiminds.pro)",$message,$headers); // Заменить домен на домен клиента
	}
?>