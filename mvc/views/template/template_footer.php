
</main>
<footer class="<?php echo $this->class ?>-footer common-footer">
<?php
if($this->page !== 'management'){
echo '<p class="copyright"><small>created by SIE</small></p>';
}
?>
</footer>
<?php foreach($this->js as $item){echo "<script src='" . $item . ".js'></script>\n";} ?>
</body>